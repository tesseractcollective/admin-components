import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { AdminForm, AdminInputEmail, AdminInputText } from '@tesseractcollective/admin-components'

interface Props {
  loading?: boolean
  defaultValues?: any
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => void
}

export const AddUsers: React.FC<Props> = ({ defaultValues, isOpen, onClose, onSubmit, loading }) => {
  return (
    <>
      <Dialog
        header={() => (
          <div className="self-center">
            <div className="font-light text-lg">Add User</div>
          </div>
        )}
        onHide={onClose}
        visible={isOpen}
        className="w-3/4"
      >
        <AdminForm className="grid sm:grid-cols-2 grid-cols-1 gap-4 my-2" defaultValues={defaultValues} onSubmit={onSubmit}>
          <AdminInputText required containerClassName="w-full" name="firstName" label="First Name" />
          <AdminInputText required containerClassName="w-full" name="lastName" label="Last Name" />
          <AdminInputEmail required containerClassName="w-full" name="email" label="Email" />
          <div className="grid sm:col-span-2 place-content-center">
            <Button className="w-48 flex justify-center" type="submit" loading={loading}>
              Save
            </Button>
          </div>
        </AdminForm>
      </Dialog>
    </>
  )
}
