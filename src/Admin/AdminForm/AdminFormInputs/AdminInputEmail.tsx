import React from 'react'
import AdminInputText, { AdminInputTextProps } from './AdminInputText'

const AdminInputEmail: React.FC<AdminInputTextProps> = props => {
  const validateEmail = (testEmail?: string | null): boolean | string => {
    const result =
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (result.test(String(testEmail).toLowerCase()) || !testEmail) {
      return true
    }
    return 'Email format is invalid'
  }

  const customProps = {
    ...props,
    attributeType: { ...props.attributeType, name: props.name, validation: { ...props.attributeType?.validation, ...{ validate: validateEmail } } }
  }

  return <AdminInputText {...(customProps as React.PropsWithChildren<AdminInputTextProps>)} />
}

export default AdminInputEmail
