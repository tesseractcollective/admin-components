import React, { useCallback, useEffect, useState } from 'react'
import { DataTable, DataTableGlobalFilterType, DataTablePFSEvent, DataTableProps } from 'primereact/datatable'
import isEqual from 'lodash/isEqual'
import { AdminTableAdapter, AdminTableState } from './AdminTableAdapter'

type AdminTableProps = {
  adapter: AdminTableAdapter
  shouldSubscribe?: boolean
} & DataTableProps

let debounceTimeout: any

const _AdminTable: React.ForwardRefRenderFunction<DataTable, AdminTableProps> = (props, ref) => {
  const { adapter, shouldSubscribe, filters, sortField, sortOrder, multiSortMeta, children, globalFilter: _gf, globalFilterFields, ...rest } = props

  const [fields, setFields] = useState<string[]>([])
  const [tableState, setTableState] = useState<AdminTableState>(adapter.initialState)
  const [globalFilter, setGlobalFilter] = useState<DataTableGlobalFilterType>(props.globalFilter)
  const [event, setEvent] = useState<DataTablePFSEvent | undefined>()
  const [loading, setLoading] = useState(false)
  const [needsUpdate, setNeedsUpdate] = useState<string>('')
  const [debouncedGlobalFilter, setDebouncedGlobalFilter] = useState<string | undefined>()

  const handleUpdate = useCallback(
    async (e: DataTablePFSEvent): Promise<void> => {
      setEvent(e)
      setLoading(true)
      const value = await adapter.handlePrimeReactEvent(e, fields)
      setTableState(value)
      setLoading(false)
    },
    [adapter, fields]
  )

  const onEvent = (e: DataTablePFSEvent): void => {
    setEvent(e)
    setNeedsUpdate('fromEvent')
  }

  const onFilter = (e: DataTablePFSEvent): void => {
    onEvent(e)
    props.onFilter?.(e)
  }

  const onSort = (e: DataTablePFSEvent): void => {
    onEvent(e)
    props.onSort?.(e)
  }

  const onPage = (e: DataTablePFSEvent): void => {
    onEvent(e)
    props.onPage?.(e)
  }

  useEffect(() => {
    if (shouldSubscribe) {
      adapter.subscribe(fields, state => {
        setTableState(state)
      })
    }
    return () => {
      adapter.unsubscribe()
    }
  }, [adapter, fields, shouldSubscribe])

  useEffect(() => {
    adapter.on('reload', () => {
      if (event) {
        handleUpdate(event)
      }
    })
  }, [adapter, event, handleUpdate])

  useEffect(() => {
    setNeedsUpdate('filtersFromProps')
  }, [filters, debouncedGlobalFilter, globalFilterFields])

  useEffect(() => {
    setNeedsUpdate('sortFromProps')
  }, [sortOrder, sortField, multiSortMeta])

  useEffect(() => {
    const newFields = React.Children.map(children, (child: any) => child.props.field)?.filter(field => !!field) || []
    if (!isEqual(newFields, fields)) {
      setFields(newFields)
    }
  }, [children, fields])

  useEffect(() => {
    if (globalFilter !== props.globalFilter) {
      setGlobalFilter(props.globalFilter)
    }
  }, [globalFilter, props.globalFilter])

  useEffect(() => {
    clearTimeout(debounceTimeout)
    if (!globalFilter) {
      setDebouncedGlobalFilter(globalFilter || undefined)
    } else {
      debounceTimeout = setTimeout(() => {
        setDebouncedGlobalFilter(globalFilter || undefined)
      }, 600)
    }
  }, [globalFilter])

  useEffect(() => {
    if (needsUpdate === 'filtersFromProps') {
      const newEvent: DataTablePFSEvent = {
        first: event?.first || adapter.initialState.first,
        rows: event?.rows || adapter.initialState.rows,
        filters: {
          ...event?.filters,
          ...filters
        },
        sortOrder: event?.sortOrder || sortOrder || null,
        sortField: event?.sortField || sortField || '',
        multiSortMeta: event?.multiSortMeta || multiSortMeta || null,
        globalFilter: debouncedGlobalFilter,
        globalFilterFields
      }
      if (!event || !isEqual(newEvent, event)) {
        handleUpdate(newEvent)
      }
      setNeedsUpdate('')
    } else if (needsUpdate === 'sortFromProps') {
      const newEvent: DataTablePFSEvent = {
        first: event?.first || adapter.initialState.first,
        rows: event?.rows || adapter.initialState.rows,
        filters: {
          ...filters,
          ...event?.filters
        },
        sortOrder: sortOrder || event?.sortOrder || null,
        sortField: sortField || event?.sortField || '',
        multiSortMeta: multiSortMeta || event?.multiSortMeta || null,
        globalFilter: debouncedGlobalFilter,
        globalFilterFields
      }
      if (!event || !isEqual(newEvent, event)) {
        handleUpdate(newEvent)
      }
      setNeedsUpdate('')
    } else if (needsUpdate === 'fromEvent') {
      const newEvent: DataTablePFSEvent = {
        first: event?.first || adapter.initialState.first,
        rows: event?.rows || adapter.initialState.rows,
        filters: {
          ...filters,
          ...event?.filters
        },
        sortOrder: event?.sortOrder || sortOrder || null,
        sortField: event?.sortField || sortField || '',
        multiSortMeta: event?.multiSortMeta || multiSortMeta || null,
        globalFilter: debouncedGlobalFilter,
        globalFilterFields
      }
      if (!isEqual(newEvent, event)) {
        handleUpdate(newEvent)
      }
      setNeedsUpdate('')
    }
  }, [
    needsUpdate,
    event,
    filters,
    debouncedGlobalFilter,
    globalFilterFields,
    sortOrder,
    sortField,
    multiSortMeta,
    adapter.initialState.first,
    adapter.initialState.rows,
    handleUpdate
  ])

  return (
    <DataTable
      {...rest}
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      rowsPerPageOptions={props.rowsPerPageOptions || [10, 25, 50, 100, 500]}
      loading={loading}
      value={tableState.current}
      sortField={tableState.sortField}
      sortOrder={tableState.sortOrder}
      onSort={onSort}
      filters={tableState.filters}
      onFilter={onFilter}
      paginator
      lazy
      first={tableState.first}
      rows={tableState.rows}
      totalRecords={tableState.total}
      onPage={onPage}
      ref={ref}
    >
      {children}
    </DataTable>
  )
}

export const AdminTable = React.forwardRef(_AdminTable)
