import React from 'react'
import { AdminDetailTextProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

type AdminDetailDateProps = AdminDetailTextProps & { showTime?: boolean }

const AdminDetailDate: React.FC<AdminDetailDateProps> = props => {
  const { className, attribute, type, value, showTime, ...rest } = props

  const wrapperProps: AdminDetailLabelWrapperProps = {
    className,
    attribute,
    type,
    value
  }

  const rawValue = getValue(props)
  let dateValue = rawValue ? new Date(rawValue).toLocaleDateString() : ''
  if (showTime && dateValue) {
    dateValue = `${dateValue} ${new Date(rawValue).toLocaleTimeString()}`
  }

  return (
    <AdminDetailLabelWrapper {...wrapperProps}>
      <p {...rest}>{dateValue || 'No Data'}</p>
    </AdminDetailLabelWrapper>
  )
}

export default AdminDetailDate
