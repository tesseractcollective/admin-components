import React from 'react'
import { AdminDetailBaseProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

export type AdminDetailTextProps = AdminDetailBaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { showTime?: boolean }

const AdminDetailText: React.FC<AdminDetailTextProps> = props => {
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

export default AdminDetailText
