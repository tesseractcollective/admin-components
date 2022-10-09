import React, { useContext } from 'react'
import { AdminComponentContext, AdminTable, useDataAdapter } from '@tesseractcollective/admin-components'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { UserFieldsFragmentDoc } from '../graphql/generated/graphqlRequest'
import { Button } from 'primereact/button'
import { AddUsers } from '../components/AddUsers/AddUsers'
import { useUpsertUsersMutation } from '../graphql/generated/resourceApi'

const UsersPage: React.FC = () => {
  const { client } = useContext(AdminComponentContext)
  const { tableAdapter } = useDataAdapter('users', UserFieldsFragmentDoc, client)
  const [showAddUser, setShowAddUser] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const userUpsert = useUpsertUsersMutation(client)
  const onSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true)
      await userUpsert.mutateAsync({
        objects: data
      })
      setShowAddUser(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AddUsers loading={loading} isOpen={showAddUser} onClose={() => setShowAddUser(false)} onSubmit={onSubmit} />
      <Card
        title={() => (
          <div className="flex flex-row gap-4 items-center justify-between">
            Users
            <Button icon="pi pi-plus" iconPos="right" label="Add Users" className="p-button-text" onClick={() => setShowAddUser(true)} />
          </div>
        )}
      >
        <AdminTable className="mb-3" adapter={tableAdapter}>
          <Column field="id" header="ID" sortable filter />
          <Column field="firstName" header="Last Name" sortable filter />
          <Column field="lastName" header="Last Name" sortable filter />
          <Column field="email" header="Email" sortable filter />
        </AdminTable>
      </Card>
    </>
  )
}

export default UsersPage
