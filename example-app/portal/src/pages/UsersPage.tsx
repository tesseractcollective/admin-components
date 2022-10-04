import React from 'react'
import { AdminTable } from './../../../../src/Admin'
import { useDataAdapter, gqlClient } from './../../../../src/hooks/useDataAdapter'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { UserFieldsFragmentDoc } from '../graphql/generated/graphqlRequest'

const client = gqlClient('https://tesseract-example.hasura.app/v1/graphql', 'jtW40EkPbgIadAVvoK1FImsNAiYEVYRAi7Xwfu9JPgSPI1Lxmophq0JBdAsdt7mx')

const UsersPage: React.FC = () => {
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
