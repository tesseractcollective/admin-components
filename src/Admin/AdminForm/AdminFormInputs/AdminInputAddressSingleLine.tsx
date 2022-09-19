import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Controller } from 'react-hook-form'
import { buildClassName, validateProps } from '../AdminForm'
import { AdminInputTextProps } from './AdminInputText'
import { addressSingleLineFormat } from '../../utils'

export type AdminAddressSingleLineInputProps = AdminInputTextProps

const AdminInputAddressSingleLine: React.FC<AdminAddressSingleLineInputProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, onBlur, ...baseProps } = props
  const priorityLabel = attributeType?.label ?? label ?? name

  const fieldProps = {
    ...baseProps,
    ...attributeType?.props
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type
        const parsedValue = field.value ? JSON.parse(field.value) : ''
        const value = addressSingleLineFormat(parsedValue.address)

        return (
          <div className={containerClassName}>
            <div className="p-float-label" style={{ cursor: 'not-allowed' }}>
              <InputText
                {...fieldProps}
                id={name}
                className={buildClassName(fieldProps.className, errorMessage)}
                onChange={field.onChange}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                ref={field.ref}
                value={value}
                disabled
              />
              <label htmlFor={name} className="capitalize">
                {priorityLabel}
              </label>
            </div>
            <small id={`${name}-help`} className="p-d-block">
              {helpText}
            </small>
            <small className="p-error p-d-block">{errorMessage}</small>
          </div>
        )
      }}
    />
  )
}
export default AdminInputAddressSingleLine
