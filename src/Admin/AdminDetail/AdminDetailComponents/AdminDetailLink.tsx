import React from 'react'
import { AdminDetailBaseProps, AdminDetailLabelWrapper, AdminDetailLabelWrapperProps, getValue } from '../AdminDetail'

export type AdminDetailLinkProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const AdminDetailLink: React.FC<AdminDetailLinkProps> = props => {
  const { className, attribute, type, value, ...rest } = props

  const wrapperProps: AdminDetailLabelWrapperProps = {
    className,
    attribute,
    type,
    value
  }

  return (
    <AdminDetailLabelWrapper {...wrapperProps}>
      <div {...rest}>
        <i className="pi pi-link" /> <a href={getValue(props) || '#'}>{getValue(props) || 'No Data'}</a>
      </div>
    </AdminDetailLabelWrapper>
  )
}

export default AdminDetailLink
