import { FilterMatchMode } from 'primereact/api'
import {
  DataTableFilterMatchModeType,
  DataTableFilterMeta,
  DataTableFilterMetaData,
  DataTableMultiSortMetaType,
  DataTableOperatorFilterMetaData,
  DataTableSortOrderType
} from 'primereact/datatable'
import { HasuraGraphQLNamingConvention } from '../DataAdapter'

export type WhereClause = Record<string, any>

const matchModeToEqualityFunction: Record<DataTableFilterMatchModeType, Function> = {
  contains: (value: any) => (typeof value === 'string' ? { _ilike: `%${value}%` } : { _eq: value }),
  notContains: (value: any) => (typeof value === 'string' ? { _nilike: `%${value}%` } : { _neq: value }),
  equals: (value: any) => ({ _eq: value }),
  notEquals: (value: any) => ({ _neq: value }),
  startsWith: (value: any) => (typeof value === 'string' ? { _ilike: `${value}%` } : { _eq: value }),
  endsWith: (value: any) => (typeof value === 'string' ? { _ilike: `%${value}` } : { _eq: value }),
  gt: (value: any) => ({ _gt: value }),
  gte: (value: any) => ({ _gte: value }),
  lt: (value: any) => ({ _lt: value }),
  lte: (value: any) => ({ _lte: value }),
  in: (value: any) => ({ _in: value }),
  custom: (value: any) => ({ _ilike: value }),
  between: (value: any) => ({ _ilike: value }),
  dateIs: (value: Date) => ({
    _gte: value,
    _lt: new Date(value.getTime() + 86400000)
  }),
  dateIsNot: (value: Date) => ({
    _lt: value,
    _gte: new Date(value.getTime() + 86400000)
  }),
  dateBefore: (value: Date) => ({ _lt: value }),
  dateAfter: (value: Date) => ({ _gt: value })
}

function whereClauseForFilter(path: Array<string>, filter: DataTableFilterMetaData): WhereClause {
  const [key, ...rest] = path
  // TODO: check the schema so it doesn't result in an error if incorrect
  if (key === 'attributes' && rest.length === 1) {
    return {
      attributes: {
        name: { _eq: rest[0] },
        value: matchModeToEqualityFunction[filter.matchMode](filter.value)
      }
    }
  }
  if (rest.length === 0) {
    return {
      [key]: matchModeToEqualityFunction[filter.matchMode](filter.value)
    }
  }
  return {
    [key]: whereClauseForFilter(rest, filter)
  }
}

function whereClauseForOperatorFilter(columnName: string, columnFilter: DataTableOperatorFilterMetaData): WhereClause | undefined {
  const constraintClauses = columnFilter.constraints
    .filter(constraint => constraint.value !== null)
    .map(constraint => whereClauseForFilter(columnName.split('.'), constraint))
  if (!constraintClauses.length) {
    return undefined
  }
  return {
    [`_${columnFilter.operator}`]: constraintClauses
  }
}

export function buildWhere(
  filters: DataTableFilterMeta | undefined,
  globalSearch?: string,
  globalFilterFields?: string[],
  baseWhere?: WhereClause
): WhereClause {
  if (!filters) {
    return {}
  }
  const initialWhere = baseWhere ? { _and: [baseWhere] } : {}

  const columnNames = Object.keys(filters).filter(name => name !== 'global')

  let globalFilterWhereClause: WhereClause = {}
  if (globalSearch && globalFilterFields?.length) {
    const globalFilter = {
      value: globalSearch,
      matchMode: FilterMatchMode.CONTAINS
    }
    globalFilterWhereClause = globalFilterFields.reduce<WhereClause>((where, columnName) => {
      const newWhere = whereClauseForFilter(columnName.split('.'), globalFilter)
      return {
        _or: [...(where._or || []), newWhere]
      }
    }, {})
  }

  const whereClause = columnNames.reduce<WhereClause>((where, columnName) => {
    const columnFilter = filters[columnName]
    if ('matchMode' in columnFilter) {
      return {
        ...where,
        ...whereClauseForFilter(columnName.split('.'), columnFilter)
      }
    }
    const newWhere = whereClauseForOperatorFilter(columnName, columnFilter)
    if (newWhere) {
      return {
        _and: [...(where._and || []), newWhere]
      }
    }
    return where
  }, initialWhere)

  if (globalFilterWhereClause._or) {
    return {
      _and: [...(whereClause._and || []), globalFilterWhereClause]
    }
  }
  return whereClause
}

export function buildOrderBy(
  namingConvention: HasuraGraphQLNamingConvention,
  sortField?: string,
  sortOrder?: DataTableSortOrderType,
  baseOrderBy?: DataTableMultiSortMetaType
): Record<string, string>[] | undefined {
  let sortMap = {
    '1': 'ASC_NULLS_LAST',
    '-1': 'DESC_NULLS_LAST'
  }
  if (namingConvention === 'hasuraDefault') {
    sortMap = {
      '1': 'asc_nulls_last',
      '-1': 'desc_nulls_last'
    }
  }

  const orderBy: Record<string, string>[] = []

  if (baseOrderBy && baseOrderBy.length) {
    orderBy.push(
      ...baseOrderBy.map(order => {
        if (!order.order) return { [order.field]: sortMap[`-1`] }
        return { [order.field]: sortMap[`${order.order}`] }
      })
    )
  }

  if (sortOrder && sortField) {
    const hasuraSortDirection = sortMap[`${sortOrder}`]
    if (hasuraSortDirection) {
      orderBy.push({ [sortField]: hasuraSortDirection })
    }
  }
  return orderBy.length ? orderBy : undefined
}

export function valueForPath(path: string[], item: Record<string, any>, existingValue: any): any {
  const [key, ...rest] = path
  if (key in item) {
    if (rest.length === 0) {
      return item[key]
    }
    return {
      ...existingValue,
      [rest[0]]: valueForPath(rest, item[key], existingValue?.[rest[0]])
    }
  }
  if ('name' in item && item.name === key) {
    return item.value
  }
  if (Array.isArray(item)) {
    return item
      .map(child => valueForPath(path, child, existingValue))
      .filter(value => !!value)
      .join(',')
  }
  return ''
}
