import React from 'react'
import { Control, FieldValues, RegisterOptions } from 'react-hook-form'
import Case from 'case'
import { AdminInputBaseProps } from './AdminForm'
import * as AdminInputs from './AdminFormInputs'
import { AttributeType, ValueType } from '../types'

export const inputForValueType = (type: ValueType): React.FC<AdminInputBaseProps> => {
  const fieldName = `AdminInput${Case.pascal(type)}`
  let Component = AdminInputs[fieldName as keyof typeof AdminInputs]

  if (!Component) {
    console.warn(`Missing component for type ${type}`)
    Component = AdminInputs.AdminInputText
  }
  return Component as React.FC<AdminInputBaseProps>
}

export interface AdminInputFieldProps {
  control: Control<Record<string, string>, any>
  passthroughProps?: Record<
    string,
    {
      [key: string]: any
      rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    }
  >
}

export const adminInputForAttributeType = (type: AttributeType, props: AdminInputFieldProps): React.FC<AdminInputBaseProps> => {
  const { passthroughProps, control } = props
  const Component = inputForValueType(type.valueType)

  const { rules, ...propsToPass } =
    typeof passthroughProps?.[type.name] !== 'string' && passthroughProps ? passthroughProps[type.name] : { rules: {} }

  return (
    <Component {...propsToPass} key={type.name} name={type.name} attributeType={type} rules={rules} control={control as Control<FieldValues, any>} />
  ) as any
}

export const adminInputsForAttributeTypes = (attributeTypes: AttributeType[], props: AdminInputFieldProps): React.FC<AdminInputBaseProps>[] =>
  attributeTypes.map(type => adminInputForAttributeType(type, props)).filter(component => component !== null)
