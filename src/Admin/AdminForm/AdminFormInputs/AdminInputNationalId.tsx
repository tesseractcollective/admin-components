import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Controller } from 'react-hook-form'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

enum NationalIdTypeEnum {
  UsSsn = 'UsSsn',
  UsEin = 'UsEin',
  Other = 'Other'
}

export type AdminInputNationalIdProps = AdminInputBaseProps & {
  idType: NationalIdTypeEnum
  idLength?: number
}

const AdminInputNationalId: React.FC<AdminInputNationalIdProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, required, attributeType, defaultValue, onBlur, idType, ...baseProps } = props
  const defaultIdLength = 9

  const priorityLabel = attributeType?.label ?? label ?? name
  const description = attributeType?.description
  const attributeTypeProps = attributeType?.props

  const formatId = (value: string): string => {
    if (!value) return ''
    let formattedId = value.replace(/[^\d]/g, '')
    if (idType === NationalIdTypeEnum.UsSsn) {
      if (formattedId.length < 4) {
        return formattedId
      }
      if (formattedId.length < 6) {
        formattedId = `${formattedId.slice(0, 3)}-${formattedId.slice(3)}`
      } else if (formattedId.length >= 6) {
        formattedId = `${formattedId.slice(0, 3)}-${formattedId.slice(3, 5)}-${formattedId.slice(5, defaultIdLength)}`
      }
    } else if (idType === NationalIdTypeEnum.UsEin && formattedId.length > 2) {
      formattedId = `${formattedId.slice(0, 2)}-${formattedId.slice(2, defaultIdLength)}`
    }
    return formattedId
  }

  const getMinMaxIdLength = (): number => {
    switch (idType) {
      case NationalIdTypeEnum.UsSsn:
        return defaultIdLength + 2
      case NationalIdTypeEnum.UsEin:
        return defaultIdLength + 1
      case NationalIdTypeEnum.Other:
      default:
        return props.idLength || defaultIdLength
    }
  }

  return (
    <Controller
      control={control}
      defaultValue={formatId(defaultValue)}
      name={name}
      rules={{
        required,
        minLength: getMinMaxIdLength(),
        maxLength: getMinMaxIdLength(),
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        let errorMessage = fieldState.error?.message || fieldState.error?.type
        if (errorMessage === 'minLength' || errorMessage === 'maxLength') {
          errorMessage = 'Invalid Id format'
        }

        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <InputText
                {...baseProps}
                {...attributeTypeProps}
                id={name}
                className={buildClassName(baseProps.className, errorMessage)}
                value={field.value}
                about={description}
                onChange={event => {
                  // format before field.onChange
                  // so field validation has correct value
                  event.target.value = formatId(event.target.value)
                  field.onChange(event)
                }}
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

export default AdminInputNationalId
