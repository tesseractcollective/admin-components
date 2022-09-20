import { AdminTable, useDataAdapter } from '@tesseractcollective/admin-components'
import { Column } from 'primereact/column'
import React from 'react'
import { UserFieldsFragmentDoc } from '../../graphql/generated/graphqlRequest'

const UsersTable: React.FC = () => {
  const { tableAdapter } = useDataAdapter('users', UserFieldsFragmentDoc)
  return (
    <div>
      {/* <AdminTable adapter={tableAdapter}>
        <Column field="id" header="ID" sortable filter />
      </AdminTable> */}
    </div>
  )
}

export default UsersTable
