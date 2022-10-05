import React, { useContext } from 'react'
import { AdminComponentContext, AdminTable, useDataAdapter } from '@tesseractcollective/admin-components'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { UserFieldsFragmentDoc } from '../graphql/generated/graphqlRequest'


const UsersPage: React.FC = () => {
  const {client} = useContext(AdminComponentContext)
  const { tableAdapter } = useDataAdapter('users', UserFieldsFragmentDoc, client)
  return (
    <Card>
      <AdminTable className="mb-3" adapter={tableAdapter}>
        <Column field="id" header="ID" sortable filter />
        <Column field="email" header="Email" sortable filter />
      </AdminTable>
    </Card>
  )
}

export default UsersPage
