import React from 'react'
import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { Controller } from 'react-hook-form'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputBooleanProps = CheckboxProps & AdminInputBaseProps

const AdminInputBoolean: React.FC<AdminInputBooleanProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, onBlur, onChange, ...baseProps } = props

  const priorityLabel = attributeType?.label ?? label ?? name

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

        return (
          <div className={containerClassName}>
            <div className="field-checkbox flex items-center gap-2">
              <Checkbox
                {...baseProps}
                className={buildClassName(baseProps.className, errorMessage)}
                style={{ width: '16px' }}
                inputId={name}
                value={field.value}
                checked={field.value}
                onChange={e => {
                    onChange && onChange(e)
                    field.onChange(e.checked)
                }}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                ref={field.ref}
              />

              <label htmlFor={name} className="capitalize p-text-secondary">
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

export default AdminInputBoolean
