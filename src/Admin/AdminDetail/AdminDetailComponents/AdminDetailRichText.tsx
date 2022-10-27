import React from 'react'
import { AdminDetailBaseProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

export type AdminDetailTextProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const AdminDetailRichText: React.FC<AdminDetailTextProps> = props => {
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
