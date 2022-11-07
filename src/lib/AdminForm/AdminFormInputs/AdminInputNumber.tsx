import React from 'react'
import { Controller } from 'react-hook-form'
import { InputNumber, InputNumberProps } from 'primereact/inputnumber'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputNumberProps = InputNumberProps &
  AdminInputBaseProps & {
    mode?: 'decimal' | 'currency'
  }

export const AdminInputNumber: React.FC<AdminInputNumberProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, mode, minFractionDigits, defaultValue, onBlur, ...baseprops } =
    props

  const priorityLabel = attributeType?.label ?? label ?? name

  const fieldProps = {
    ...baseprops,
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

        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <InputNumber
                {...fieldProps}
                id={name}
                className={buildClassName(fieldProps.className, errorMessage)}
                value={field.value}
                mode={mode || 'decimal'}
                minFractionDigits={minFractionDigits ?? 2}
                onChange={e => field.onChange({ target: { value: e.value } })}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                ref={field.ref}
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
