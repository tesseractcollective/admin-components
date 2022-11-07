import React from 'react'
import { Controller } from 'react-hook-form'

import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputToggleProps = ToggleButtonProps & AdminInputBaseProps

export const AdminInputToggle: React.FC<AdminInputToggleProps> = props => {
  validateProps(props)
  const { control, name, helpText, containerClassName, required, attributeType, onIcon, offIcon, onLabel, offLabel, defaultValue, ...baseProps } =
    props

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
            <ToggleButton
              {...fieldProps}
              id={name}
              checked={field.value}
              value={field.value}
              onLabel={onLabel}
              offLabel={offLabel}
              onIcon={onIcon || 'pi pi-check'}
              offIcon={offIcon || 'pi pi-times'}
              className={buildClassName(fieldProps.className, errorMessage)}
              onBlur={field.onBlur}
              onChange={field.onChange}
              ref={field.ref}
            />
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
