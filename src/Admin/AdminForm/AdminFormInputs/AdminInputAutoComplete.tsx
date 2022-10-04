import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'
import { DataAdapter } from '../../DataAdapter'
import { AdminInputBaseProps, validateProps } from '../AdminForm'
import { AutoComplete, AutoCompleteProps } from 'primereact/autocomplete'
import { useNavigate } from 'react-router-dom'

interface InputRelationProps {
  relationshipColumnNameForLabel: string
  relationshipColumnNameForValue: string
  adapter: DataAdapter
  pkForRoute?: string
  route?: string
}

export type AdminInputAutoCompleteProps = AutoCompleteProps & AdminInputBaseProps & InputRelationProps
type OptionProps = { value: any; label: string; pk?: string }

const AdminInputAutoComplete: React.FC<AdminInputAutoCompleteProps> = props => {
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
    relationshipColumnNameForLabel,
    relationshipColumnNameForValue,
    defaultValue,
    pkForRoute,
    route,
    onBlur,
    ...baseProps
  } = props

  const priorityLabel = attributeType?.label ?? label ?? name

  const [filteredOptions, setFilteredOptions] = useState<OptionProps[]>()
  const [lazyLoading, _setLazyLoading] = useState<any>(false)
  const fieldValue = control?._getWatch(name)
  const navigate = useNavigate()

  const itemTemplate = (tOptions: any): ReactNode => {
    const className = classNames('custom-scroll-item scroll-item', {
      odd: tOptions.odd
    })
    return lazyLoading ? (
      <div className={className}>
        <div className="flex align-items-center px-2 my-2">
          <Skeleton width="100%" height="2.5rem" />
        </div>
        <div className="flex align-items-center px-2 my-2">
          <Skeleton width="100%" height="2.5rem" />
        </div>
      </div>
    ) : (
      <div>{tOptions.label}</div>
    )
  }
  const getOptions = useCallback(async (): Promise<void> => {
    await adapter
      ?.infiniteManyQuery({
        limit: 100,
        orderBy: { [name]: 'ASC' },
        where: {
          [name]: {
            _isNull: false,
            _ilike: fieldValue?.value ? `%${fieldValue?.value}%` : fieldValue ? `%${fieldValue}%` : '%%'
          }
        }
      })
      .then(({ data }: Record<string, any>) => {
        const items = data?.current?.map?.((item: Record<string, string>) => ({
          value: item[relationshipColumnNameForValue],
          label: item[relationshipColumnNameForLabel],
          pk: pkForRoute ? item[pkForRoute] : undefined
        }))
        setFilteredOptions(items)
      })
  }, [adapter, relationshipColumnNameForLabel, relationshipColumnNameForValue, fieldValue])

  useEffect(() => {
    if (!filteredOptions) {
      getOptions()
    }
  }, [getOptions, filteredOptions])

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field: { ref, onChange, ...inputProps }, fieldState: { invalid, error }, formState: _formState }) => {
        const errorMessage = error?.message || error?.type

        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <AutoComplete
                {...inputProps}
                className={`w-full ${invalid ? 'p-invalid' : ''}`}
                onChange={e => {
                  if (props.onSelect) {
                    props.onSelect(e.value)
                  }
                  onChange({ target: { value: e.value } })
                }}
                field={props.field ?? 'value'}
                onBlur={() => {
                  inputProps.onBlur()
                  onBlur && onBlur()
                }}
                ref={ref}
                virtualScrollerOptions={{ itemSize: 50 }}
                suggestions={filteredOptions}
                completeMethod={getOptions}
                itemTemplate={itemTemplate}
                {...baseProps}
              />
              <label htmlFor={name}>{priorityLabel}</label>
            </div>
            <small id={`${name}-help`} className="p-d-block">
              {helpText}
            </small>
            <small className="p-error p-d-block">{errorMessage}</small>
            {filteredOptions?.[0]?.value === fieldValue && fieldValue ? (
              <div className="text-yellow-500 flex items-center mt-1">
                <i className="pi pi-exclamation-triangle mr-1" style={{ fontSize: '0.9rem' }} />
                <small className="p-d-block">
                  Already in the system.{' '}
                  {filteredOptions?.[0]?.pk ? (
                    <button
                      type="button"
                      className="text-blue-500 cursor-pointer underline"
                      onClick={() => navigate(route ? route?.replace(':pk', filteredOptions?.[0]?.pk ?? '') : '')}
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

export default AdminInputAutoComplete
