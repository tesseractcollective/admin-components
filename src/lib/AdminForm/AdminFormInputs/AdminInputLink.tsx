import React from 'react'
import { AdminInputTextProps, AdminInputText } from './AdminInputText'

export const AdminInputLink: React.FC<AdminInputTextProps> = props => {
  const isValidUrl = (url: string): string | boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj ? true : 'Invalid URL'
    } catch (e) {
      return 'Invalid URL'
    }
  }

  const customProps = {
    ...props,
    attributeType: { ...props.attributeType, name: props.name, validation: { ...props.attributeType?.validation, ...{ validate: isValidUrl } } }
  }

  return <AdminInputText {...(customProps as React.PropsWithChildren<AdminInputTextProps>)} type="url" pattern="https://.*" />
}
