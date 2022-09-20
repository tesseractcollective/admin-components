import { AdminTable, useDataAdapter } from './../../../../../src/Admin'
import { Column } from 'primereact/column'
import React from 'react'
import { UserFieldsFragmentDoc } from '../../graphql/generated/graphqlRequest'

const UsersTable: React.FC = () => {
  const { tableAdapter } = useDataAdapter('users', UserFieldsFragmentDoc)
  return (
    <div>
      <AdminTable adapter={tableAdapter} filterDisplay="menu" size="small" sortField="updatedAt">
        <Column field="id" header="ID" sortable filter />
      </AdminTable>
    </div>
  )
}

export default UsersTable
