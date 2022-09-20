import React from 'react'
import { AdminDetailTextProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

const AdminDetailText: React.FC<AdminDetailTextProps> = props => {
  const { className, attribute, type, value, ...rest } = props

  const wrapperProps: AdminDetailLabelWrapperProps = {
    className,
    attribute,
    type,
    value
  }

  return (
    <AdminDetailLabelWrapper {...wrapperProps}>
      <p {...rest}>{getValue(props)}</p>
    </AdminDetailLabelWrapper>
  )
}

export default AdminDetailText
