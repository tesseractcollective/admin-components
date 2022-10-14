// eslint-disable-next-line max-classes-per-file
import { DataTableFilterMeta, DataTablePFSEvent, DataTableSortOrderType } from 'primereact/datatable'

import { buildOrderBy, buildWhere, valueForPath } from './adminTableUtils'
import { HasuraDataAdapter } from '../DataAdapter'

export type WhereClause = Record<string, any>

export interface AdminTableState {
  current: any[]
  total: number
  first: number
  rows: number
  sortField?: string
  sortOrder?: DataTableSortOrderType
  filters?: DataTableFilterMeta
  error?: string
}

export type AdminTableAdapterEventName = 'reload' | 'data'

export interface AdminTableEventListener {
  (evt: Event, data: any): void
}

export interface ExportOptions {
  fields?: string[]
  sortField?: string
  sortOrder?: DataTableSortOrderType
  filters?: DataTableFilterMeta
}

export abstract class AdminTableAdapter {
  events: Record<AdminTableAdapterEventName, AdminTableEventListener[]> = {
    reload: [],
    data: []
  }

  abstract readonly initialState: AdminTableState

  abstract handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>

  abstract fetchAllAsRecords(options: ExportOptions): Promise<Record<string, any>[]>

  on(eventName: AdminTableAdapterEventName, listener: AdminTableEventListener): void {
    this.events[eventName].push(listener)
  }

  emit(eventName: AdminTableAdapterEventName, data?: any): void {
    for (const listener of this.events[eventName]) {
      listener(new Event(eventName), data)
    }
  }

  reload(): void {
    this.emit('reload')
  }
}

export class AdminTableHasuraAdapter extends AdminTableAdapter {
  dataAdapter: HasuraDataAdapter

  baseWhere?: WhereClause

  readonly initialState: AdminTableState = {
    current: [],
    total: 0,
    first: 0,
    rows: 10
  }

  constructor(dataAdapter: HasuraDataAdapter, baseWhere?: WhereClause) {
    super()
    this.dataAdapter = dataAdapter
    this.baseWhere = baseWhere
  }

  async handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState> {
    const rows = e?.rows || this.initialState.rows
    const first = e?.first || this.initialState.first
    const where = buildWhere(e?.filters, e?.globalFilter, e?.globalFilterFields, this.baseWhere)
    const orderBy = buildOrderBy(this.dataAdapter.namingConvention, e?.sortField, e?.sortOrder, e?.multiSortMeta)

    let { current, total } = this.initialState
    let error: string | undefined

    try {
      const result = await this.dataAdapter.infiniteManyQuery({
        limit: rows,
        offset: first,
        where,
        orderBy
      })

      current =
        result.data?.current.map((item: any) => {
          const row: any = {}
          fields.forEach(field => {
            const path = field.split('.')
            row[path[0]] = valueForPath(path, item, row[path[0]])
          })
          return {
            ...item,
            ...row
          }
        }) || []
      total = result.data?.aggregate.aggregate.count || 0

      this.emit('data', current)
    } catch (graphqlError: any) {
      // TODO: parse error
      console.log(graphqlError)
      error = graphqlError
    }

    const state: AdminTableState = {
      current,
      total,
      error,
      first,
      rows,
      filters: e?.filters,
      sortField: e?.sortField,
      sortOrder: e?.sortOrder
    }
    return state
  }

  // TODO: finish this as a helper for exporting data
  async fetchAllAsRecords(_options: ExportOptions): Promise<Record<string, any>[]> {
    // TODO: query all with pagination
    // map all the results to the fields
    // const where = buildWhere(options.filters, undefined, undefined)
    // const orderBy = buildOrderBy(this.dataAdapter.namingConvention, options.sortField, options.sortOrder)

    const records: Record<string, any>[] = []

    // const limit = 100
    // const hasMore = true
    // let offest = 0
    // while (hasMore) {}
    return records
  }
}
