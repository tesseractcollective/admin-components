import React from 'react'
import { AdminDetailTextProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

const AdminDetailRichText: React.FC<AdminDetailTextProps> = props => {
  const { className, attribute, type, value, ...rest } = props

  const wrapperProps: AdminDetailLabelWrapperProps = {
    className,
    attribute,
    type,
    value
  }

  return (
    <AdminDetailLabelWrapper {...wrapperProps}>
      <div {...rest} dangerouslySetInnerHTML={{ __html: getValue(props) }} />
    </AdminDetailLabelWrapper>
  )
}

export default AdminDetailRichText
