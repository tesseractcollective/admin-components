import React from 'react'
import Case from 'case'
import { nanoid } from 'nanoid'
import { classNames } from 'primereact/utils'
import { Attribute, AttributeGroup, AttributeType, ValueType } from '../types'
import * as AdminDetails from './AdminDetailComponents'
import { AdminDetailTextProps } from './AdminDetailComponents/AdminDetailDate'

export interface AdminDetailBaseProps {
  value?: string
  type?: AttributeType
  attribute?: Attribute
  labelClassName?: string
  hideLabel?: boolean
}

export type AdminDetailLabelWrapperProps = AdminDetailBaseProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const AdminDetailLabelWrapper: React.FC<AdminDetailLabelWrapperProps> = props => {
  const { value: _value, type, attribute, labelClassName, children, hideLabel, ...rest } = props

  const label = type?.label || attribute?.type.label || type?.name || attribute?.type.name || ''

  if (hideLabel) {
    return <>{children}</>
  }
  return (
    <div {...rest}>
      <div className={classNames(labelClassName, 'font-bold p-text-primary text-sm')}>{label}</div>
      {children}
    </div>
  )
}

export const getValue = (props: AdminDetailBaseProps): any => {
  const type = props.type || props.attribute?.type
  const value = props.value || props.attribute?.value || ''
  if (type?.valueType.toLocaleLowerCase().includes('text')) {
    return value || 'No Data'
  }
  return value
}

export const detailComponentForValueType = (type: ValueType | undefined): React.FC<AdminDetailTextProps> => {
  const componentName = type ? `AdminDetail${Case.pascal(type)}` : 'AdminDetailText'
  let Component = AdminDetails[componentName as keyof typeof AdminDetails]

  if (!Component) {
    console.warn(`Missing component for type ${type}`)
    Component = AdminDetails.AdminDetailText
  }
  return Component as React.FC<AdminDetailTextProps>
}

export const adminDetailForAttribute = (attribute: Attribute | undefined, props?: AdminDetailLabelWrapperProps): React.FC<AdminDetailBaseProps> => {
  const Component = detailComponentForValueType(attribute?.type.valueType)
  return (<Component {...props} key={attribute?.type.name || nanoid()} attribute={attribute} />) as any
}

export const adminDetailsForAttributes = (attributes: Attribute[], props: AdminDetailBaseProps): React.FC<AdminDetailBaseProps>[] =>
  attributes.map(attribute => adminDetailForAttribute(attribute, props)).filter(component => component !== null)

export const findTypeInTypes = (types: AttributeType[], name: string): AttributeType | undefined => {
  for (const type of types) {
    if (type.name === name) {
      return type
    }
  }
  return undefined
}

export const findTypeInGroups = (groups: AttributeGroup[], name: string): AttributeType | undefined => {
  for (const group of groups) {
    const type = findTypeInTypes(group.types, name)
    if (type) {
      return type
    }
  }
  return undefined
}
