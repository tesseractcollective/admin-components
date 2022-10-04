import React, { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { DataAdapter } from '../../DataAdapter'
import { useNavigate } from 'react-router-dom'
import { InputText, InputTextProps } from 'primereact/inputtext'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'

interface InputDuplicateCheckProps {
  adapter: DataAdapter
  pkForRoute?: string
  route?: string
}

export type AdminInputTextCheckProps = InputTextProps & AdminInputBaseProps & InputDuplicateCheckProps

const AdminInputDuplicateCheck: React.FC<AdminInputTextCheckProps> = props => {
  validateProps(props)
  const {
    control,
    name,
    label,
    helpText,
    containerClassName,
    required,
    attributeType,
    adapter,
    defaultValue,
    pkForRoute,
    route,
    onBlur,
    ...baseProps
  } = props

  const priorityLabel = attributeType?.label ?? label ?? name
  const description = attributeType?.description

  const [duplicateValue, setDuplicateValue] = useState<any>(undefined)
  const [fieldValue, setFieldValue] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const attributeTypeProps = attributeType?.props

  const checkDuplicateValue = useCallback(async (): Promise<void> => {
    await adapter
      ?.infiniteManyQuery({
        limit: 100,
        orderBy: { [name]: 'ASC' },
        where: {
          [name]: {
            _isNull: false,
            _ilike: `%${fieldValue}%`
          }
        }
      })
      .then(({ data }: Record<string, any>) => {
        setDuplicateValue(data.current[0])
      })
  }, [adapter, fieldValue])

  useEffect(() => {
    checkDuplicateValue()
  }, [fieldValue])

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
              <InputText
                {...baseProps}
                {...attributeTypeProps}
                id={name}
                className={buildClassName(baseProps.className, errorMessage)}
                value={field.value}
                about={description}
                onChange={e => {
                  field.onChange(e.target.value)
                  setFieldValue(e.target.value)
                }}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                ref={field.ref}
              />
              <label htmlFor={name}>{priorityLabel}</label>
            </div>
            <small id={`${name}-help`} className="p-d-block">
              {helpText}
            </small>
            <small className="p-error p-d-block">{errorMessage}</small>
            {duplicateValue?.[name] === fieldValue && fieldValue ? (
              <div className="text-yellow-500 flex items-center mt-1">
                <i className="pi pi-exclamation-triangle mr-1" style={{ fontSize: '0.9rem' }} />
                <small className="p-d-block">
                  Already in the system.{' '}
                  {duplicateValue && route ? (
                    <button
                      type="button"
                      className="text-blue-500 cursor-pointer underline"
                      onClick={() => {
                        navigate(route ? route?.replace(':pk', duplicateValue[pkForRoute ?? ''] ?? '') : '')
                      }}
                    >
                      view
                    </button>
                  ) : null}
                </small>
              </div>
            ) : null}
          </div>
        )
      }}
    />
  )
}

export default AdminInputDuplicateCheck
