import React, { useContext, useRef } from 'react'
import { AdminComponentContext, AdminTable, useDataAdapter } from '@tesseractcollective/admin-components'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { UserFieldsFragmentDoc } from '../graphql/generated/graphqlRequest'
import { AddUsersModal } from '../components/AddUsersModal/AddUsersModal'
import { useUpsertUsersMutation } from '../graphql/generated/resourceApi'

const UsersPage: React.FC = () => {
  const { client } = useContext(AdminComponentContext)
  const { tableAdapter } = useDataAdapter('users', UserFieldsFragmentDoc)
  const [showAddUser, setShowAddUser] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const toast = useRef<Toast>(null)
  const userUpsert = useUpsertUsersMutation(client)
  const onSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true)
      await userUpsert.mutateAsync({
        objects: data
      })
      tableAdapter.reload()
      toast.current?.show({ severity: 'success', summary: 'Success Message', detail: 'Added User' })
      setShowAddUser(false)
    } catch (error: any) {
      console.error(error)
      toast.current?.show({ severity: 'error', summary: 'Error Message', detail: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <AddUsersModal loading={loading} isOpen={showAddUser} onClose={() => setShowAddUser(false)} onSubmit={onSubmit} />
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
