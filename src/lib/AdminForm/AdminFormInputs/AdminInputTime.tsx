import React from 'react'
import { Controller } from 'react-hook-form'
import { Calendar, CalendarProps } from 'primereact/calendar'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputTimeProps = CalendarProps & AdminInputBaseProps

export const AdminInputTime: React.FC<AdminInputTimeProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, onBlur, ...baseProps } = props

  const priorityLabel = attributeType?.label ?? label ?? name
  const attributeTypeProps = attributeType?.props

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
              <Calendar
                {...baseProps}
                {...attributeTypeProps}
                timeOnly
                hourFormat="12"
                id={name}
                className={buildClassName(baseProps.className, errorMessage)}
                value={field.value}
                onChange={field.onChange}
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
