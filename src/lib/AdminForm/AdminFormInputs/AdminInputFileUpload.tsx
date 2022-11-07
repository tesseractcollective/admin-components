import React from 'react'
import { Controller } from 'react-hook-form'
import { FileUpload, FileUploadProps } from 'primereact/fileupload'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

export type AdminInputFileUploadProps = FileUploadProps & AdminInputBaseProps

export const AdminInputFileUpload: React.FC<AdminInputFileUploadProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, mode, defaultValue, ...baseprops } = props

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
              <FileUpload
                {...fieldProps}
                id={name}
                name={name}
                className={buildClassName(fieldProps.className, errorMessage)}
                url={field.value}
                onSelect={e => field.onChange({ target: { value: e.files[0] } })}
                ref={field.ref}
                mode={mode}
              />
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
