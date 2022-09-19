// eslint-disable-next-line max-classes-per-file
import { DataTableFilterMeta, DataTableMultiSortMetaType, DataTablePFSEvent, DataTableSortOrderType } from 'primereact/datatable'
import { buildOrderBy, buildWhere, valueForPath, WhereClause } from './adminTableUtils'
import { HasuraDataAdapter } from '../DataAdapter'

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

export type AdminTableAdapterEvent = 'reload'

export interface ExportOptions {
  fields?: string[]
  sortField?: string
  sortOrder?: DataTableSortOrderType
  filters?: DataTableFilterMeta
}

export abstract class AdminTableAdapter {
  events: Record<AdminTableAdapterEvent, EventListener[]> = {
    reload: []
  }

  abstract readonly initialState: AdminTableState

  abstract handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState>

  abstract subscribe(fields: string[], callback: (state: AdminTableState) => void): void

  abstract unsubscribe(): void

  abstract fetchAllAsRecords(options: ExportOptions): Promise<Record<string, any>[]>

  on(event: AdminTableAdapterEvent, listener: EventListener): void {
    this.events[event].push(listener)
  }

  emit(event: AdminTableAdapterEvent): void {
    for (const listener of this.events[event]) {
      listener(new Event(event))
    }
  }

  reload(): void {
    this.emit('reload')
  }
}

export class AdminTableHasuraAdapter extends AdminTableAdapter {
  dataAdapter: HasuraDataAdapter

  lastEvent?: DataTablePFSEvent

  baseWhere?: WhereClause

  baseDistinctOn?: string[]

  baseOrderBy?: DataTableMultiSortMetaType

  readonly initialState: AdminTableState = {
    current: [],
    total: 0,
    first: 0,
    rows: 10
  }

  constructor(dataAdapter: HasuraDataAdapter, baseWhere?: WhereClause, baseDistinctOn?: string[], baseOrderBy?: DataTableMultiSortMetaType) {
    super()
    this.dataAdapter = dataAdapter
    this.baseWhere = baseWhere
    this.baseDistinctOn = baseDistinctOn
    this.baseOrderBy = baseOrderBy
  }

  async handlePrimeReactEvent(e: DataTablePFSEvent | undefined, fields: string[]): Promise<AdminTableState> {
    this.lastEvent = e
    const rows = e?.rows || this.initialState.rows
    const first = e?.first || this.initialState.first
    const where = buildWhere(e?.filters, e?.globalFilter, e?.globalFilterFields, this.baseWhere)
    const orderBy = buildOrderBy(this.dataAdapter.namingConvention, e?.sortField, e?.sortOrder, this.baseOrderBy)

    let error: string | undefined

    try {
      const options = {
        limit: rows,
        offset: first,
        where,
        distinctOn: this.baseDistinctOn,
        orderBy
      }
      // if (this.dataAdapter.webSocketClient) {
      //   this.dataAdapter.websocketConfig = {
      //     ...this.dataAdapter.websocketConfig,
      //     options
      //   }
      //   this.dataAdapter.resetWebsocket()
      // }
      const result = await this.dataAdapter.infiniteManyQuery(options)
      return this.createNewState(e, fields, result, error)
    } catch (graphqlError) {
      // TODO: parse error
      console.log(graphqlError)
      error = graphqlError
      return this.createNewState(e, fields, undefined, error)
    }
  }

  subscribe(fields: string[], callback: (state: AdminTableState) => void): void {
    this.dataAdapter.infiniteManySubscription((error, data) => {
      callback(this.createNewState(this.lastEvent, fields, data, error))
    })
  }

  unsubscribe(): void {
    this.dataAdapter.unsubscribe()
  }

  private createNewState(e: DataTablePFSEvent | undefined, fields: string[], result: any, error: string | undefined): AdminTableState {
    const rows = e?.rows || this.initialState.rows
    const first = e?.first || this.initialState.first
    let { current, total } = this.initialState

    if (result) {
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
