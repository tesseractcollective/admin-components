import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'
import { DataAdapter } from '../../DataAdapter'
import { AdminInputBaseProps, validateProps } from '../AdminForm'
import { AutoComplete, AutoCompleteCompleteMethodParams, AutoCompleteProps } from 'primereact/autocomplete'

interface InputRelationProps {
  relationshipColumnNameForLabel: string
  relationshipColumnNameForValue: string
  adapter: DataAdapter
  where?: Record<string, any>
}

export type AdminInputRelationProps = AutoCompleteProps & AdminInputBaseProps & InputRelationProps
type OptionProps = { value: any; label: string }

export const AdminInputRelation: React.FC<AdminInputRelationProps> = props => {
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
  const [filteredItems, setFilteredItems] = useState<any>(null)
  const [displayValue, setDisplayValue] = useState<any>(null)
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
    await adapter?.infiniteManyQuery({ where, limit: 100 }).then(({ data }: Record<string, any>) => {
      const items = data?.current?.map?.((item: Record<string, string>) => {
        // we can now use nested object values for label and value e.g "user.bio.firstName"
        const splitValueArr = relationshipColumnNameForValue.split('.')
        const splitLabelArr = relationshipColumnNameForLabel.split('.')
        let valueData: any = { ...item }
        let labelData: any = { ...item }

        splitValueArr.forEach(relationship => {
          valueData = valueData[relationship]
        })
        splitLabelArr.forEach(relationship => {
          labelData = labelData[relationship]
        })
        return {
          value: valueData,
          label: labelData
        }
      })
      setOptions(items || [])
    })
  }, [adapter, relationshipColumnNameForLabel, relationshipColumnNameForValue, where])

  const searchItems = (event: AutoCompleteCompleteMethodParams) => {
    const userInput = event.query
    const _filteredItems: any[] = []
    for (let i = 0; i < options!.length; i++) {
      const item = options![i]
      if (item.label.toLowerCase().indexOf(userInput.toLowerCase()) === 0) {
        _filteredItems.push(item)
      }
    }
    setFilteredItems(_filteredItems)
  }

  useEffect(() => {
    if (!options) {
      getOptions()
    }
  }, [getOptions, options])

  useEffect(() => {
    getOptions()
  }, [getOptions, where])

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        required,
        ...attributeType?.validation
      }}
      render={({ field: { ref, onChange, value, ...inputProps }, fieldState: { invalid, error }, formState: _formState }) => {
        const errorMessage = error?.message || error?.type
        return (
          <div className={containerClassName}>
            <div className="p-float-label">
              <AutoComplete
                {...inputProps}
                className={`w-full ${invalid ? 'p-invalid' : ''}`}
                ref={ref}
                field="label"
                dropdown
                value={displayValue}
                onChange={e => {
                  if (props.onSelect) {
                    props.onSelect(e.value)
                  }
                  if (typeof e.value === 'object') {
                    setDisplayValue(e.value.label)
                    onChange(e.value.value)
                  } else {
                    setDisplayValue(e.value)
                    onChange(e.value)
                  }
                }}
                itemTemplate={itemTemplate}
                suggestions={filteredItems}
                completeMethod={searchItems}
                virtualScrollerOptions={{ itemSize: 50 }}
                onBlur={() => {
                  inputProps.onBlur()
                  onBlur && onBlur()
                }}
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
