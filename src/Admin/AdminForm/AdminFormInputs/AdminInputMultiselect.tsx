import React from 'react'
import { Controller } from 'react-hook-form'
import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputMultiSelectProps = MultiSelectProps &
  AdminInputBaseProps & {
    optionValueType?: 'string' | 'number'
  }

export const AdminInputMultiSelect: React.FC<AdminInputMultiSelectProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, options, ...baseProps } = props

  const fieldProps = {
    ...baseProps,
    ...attributeType?.props
  }

  const priorityLabel = attributeType?.label ?? label ?? name

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required, ...attributeType?.validation }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <MultiSelect
                {...baseProps}
                id={name}
                className={buildClassName(fieldProps.className, errorMessage)}
                value={field.value}
                options={options || fieldProps.options}
                onChange={field.onChange}
                showClear={baseProps.showClear ?? true}
                showSelectAll={baseProps.showSelectAll ?? false}
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
