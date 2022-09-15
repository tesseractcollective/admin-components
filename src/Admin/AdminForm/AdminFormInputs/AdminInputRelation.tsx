import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { Skeleton } from 'primereact/skeleton'
import { DataAdapter } from '../../DataAdapter'
import { AdminInputBaseProps, validateProps } from '../AdminForm'

interface InputRelationProps {
  relationshipColumnNameForLabel: string
  relationshipColumnNameForValue: string
  adapter: DataAdapter
  where?: Record<string, any>
}

export type AdminInputRelationProps = DropdownProps & AdminInputBaseProps & InputRelationProps
type OptionProps = { value: any; label: string }

const AdminInputRelation: React.FC<AdminInputRelationProps> = props => {
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
    where,
    defaultValue,
    onBlur,
    ...baseProps
  } = props

  const priorityLabel = attributeType?.label ?? label ?? name

  const [options, setOptions] = useState<OptionProps[]>()
  const [lazyLoading, _setLazyLoading] = useState<any>(false)

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
    // setLazyLoading(true)
    await adapter?.infiniteManyQuery({ where }).then(({ data }: Record<string, any>) => {
      const items = data?.current?.map?.((item: Record<string, string>) => ({
        value: item[relationshipColumnNameForValue],
        label: item[relationshipColumnNameForLabel]
      }))
      setOptions(items || [])
      // setLazyLoading(false)
    })
  }, [adapter, relationshipColumnNameForLabel, relationshipColumnNameForValue, where])

  useEffect(() => {
    if (!options) {
      getOptions()
    }
  }, [getOptions, options])

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
              <Dropdown
                {...inputProps}
                className={`w-full ${invalid ? 'p-invalid' : ''}`}
                onChange={e => {
                  if (props.onSelect) {
                    props.onSelect(e.value)
                  }
                  onChange({ target: { value: e.value } })
                }}
                onBlur={() => {
                  inputProps.onBlur()
                  onBlur && onBlur()
                }}
                // virtualScrollerOptions={
                //   options && options.length < 100
                //     ? undefined
                //     : {
                //         lazy: true,
                //         itemSize: 100,
                //         showLoader: true,
                //         loading: lazyLoading,
                //         delay: 0,
                //         loadingTemplate: itemTemplate
                //       }
                // }
                ref={ref}
                filterBy="label"
                options={options}
                itemTemplate={itemTemplate}
                filter
                showClear
                {...baseProps}
              />
              <label htmlFor={name}>{priorityLabel}</label>
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

export default AdminInputRelation
