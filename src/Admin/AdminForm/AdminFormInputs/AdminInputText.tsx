import React from 'react'
import { Controller } from 'react-hook-form'
import { InputTextProps, InputText } from 'primereact/inputtext'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'
import { InputTextarea, InputTextareaProps } from 'primereact/inputtextarea'

interface InputProps {
  isTextArea?: boolean
}

export type AdminInputTextProps = InputTextProps & AdminInputBaseProps & InputTextareaProps & InputProps

const AdminInputText: React.FC<AdminInputTextProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, isTextArea, onBlur, ...baseProps } = props

  const priorityLabel = attributeType?.label ?? label ?? name
  const description = attributeType?.description
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
              {!isTextArea ? (
                <InputText
                  {...baseProps}
                  {...attributeTypeProps}
                  id={name}
                  className={buildClassName(baseProps.className, errorMessage)}
                  value={field.value}
                  about={description}
                  onChange={field.onChange}
                  onBlur={() => {
                    field.onBlur()
                    onBlur && onBlur()
                  }}
                  ref={field.ref}
                />
              ) : (
                <InputTextarea
                  {...baseProps}
                  {...attributeTypeProps}
                  id={name}
                  className={buildClassName(baseProps.className, errorMessage)}
                  value={field.value}
                  about={description}
                  onChange={field.onChange}
                  onBlur={() => {
                    field.onBlur()
                    onBlur && onBlur()
                  }}
                  ref={field.ref}
                />
              )}

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

export default AdminInputText
