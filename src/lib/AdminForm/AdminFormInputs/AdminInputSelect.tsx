import React from 'react'
import { Controller } from 'react-hook-form'
import { DropdownProps, Dropdown } from 'primereact/dropdown'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputSelectProps = DropdownProps &
  AdminInputBaseProps & {
    optionValueType?: 'string' | 'number'
  }

export const AdminInputSelect: React.FC<AdminInputSelectProps> = props => {
  validateProps(props)
  const {
    control,
    name,
    label,
    helpText,
    containerClassName,
    required,
    attributeType,
    onSelect,
    options,
    defaultValue,
    onBlur,
    optionValueType,
    ...baseProps
  } = props

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
        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <Dropdown
                {...fieldProps}
                id={name}
                className={buildClassName(fieldProps.className, errorMessage)}
                value={optionValueType === 'number' ? `${field.value}` : field.value}
                options={options || fieldProps.options}
                onChange={e => {
                  const value = optionValueType === 'number' ? Number(e.value) : e.value
                  if (onSelect) {
                    onSelect(value)
                  }
                  field.onChange({ target: { value: value } })
                }}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                filterBy="label"
                optionLabel="label"
                showClear={baseProps.showClear ?? true}
                ref={field.ref}
              />

              <label htmlFor={name}>{attributeType?.label || label || name}</label>
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
