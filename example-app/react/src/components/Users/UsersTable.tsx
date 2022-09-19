import { AdminTable, useDataAdapter } from 'admin-components'
import { Column } from 'primereact/column'
import React from 'react'

const UsersTable: React.FC = () => {
  const { tableAdapter } = useDataAdapter('users', UsersTableFragment)
  return (
    <div>
      <AdminTable adapter={tableAdapter}>
        <Column field="column_1" header="Column 1" sortable filter />
        <Column field="column_2" header="Column 2" sortable filter />
        <Column field="column_3" header="Column 3" sortable filter />
      </AdminTable>
    </div>
  )
}

export default UsersTable
