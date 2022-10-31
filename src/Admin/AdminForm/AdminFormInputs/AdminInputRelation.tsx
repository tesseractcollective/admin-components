import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { classNames } from 'primereact/utils'
import { Skeleton } from 'primereact/skeleton'
import { DataAdapter } from '../../DataAdapter'
import { AdminInputBaseProps, validateProps } from '../AdminForm'
import { AutoComplete, AutoCompleteCompleteMethodParams } from 'primereact/autocomplete'
import useDebounce from 'hooks/useDebounce'

export interface AdminInputRelationProps<T extends Record<string, any>> extends AdminInputBaseProps {
  relationshipColumnNameForLabel: string
  relationshipColumnNameForValue: string
  adapter: DataAdapter
  labelComparisonOperator?: '_eq' | '_ilike' | '_like'
  where?: T
  totalRecordsLimit?: number
}

type OptionProps = { value: any; label: string }

export const AdminInputRelation = <T extends Record<string, any>>(props: AdminInputRelationProps<T>) => {
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
    labelComparisonOperator = '_ilike',
    totalRecordsLimit = 100,
    onBlur,
    ...baseProps
  } = props

  const priorityLabel = attributeType?.label ?? label ?? name

  const [options, setOptions] = useState<OptionProps[]>()
  const [filteredItems, setFilteredItems] = useState<OptionProps[]>([])
  const [displayValue, setDisplayValue] = useState<any>(null)
  const [numberOfItems, setNumberOfItems] = useState<number>(0)
  const [lazyLoading, _setLazyLoading] = useState<any>(false)
  const [resultsFound, setResultsFound] = useState<boolean>(false)
  const [defaultResults, setDefaultResults] = useState<OptionProps[] | null>(null)

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

  const buildwhereClause = (queryString: string): Record<string, any> | undefined => {
    const userInput = queryString
    if (userInput && where) {
      const splitLabelArr = relationshipColumnNameForLabel.split('.') // TODO: make function to DRY

      if (splitLabelArr.length > 1) {
        const labelWhereClause: Record<string, any> = {}

        // using dot notation will yield AT LEAST 2 items
        if (splitLabelArr.length > 1) {
          splitLabelArr.reduce(function (prev, current, currentIndex) {
            if (currentIndex >= splitLabelArr.length - 1) {
              return (prev[current] = { [labelComparisonOperator]: `%${userInput}%` })
            }
            return (prev[current] = {})
          }, labelWhereClause)
        }

        return {
          _or: [labelWhereClause],
          _and: [where]
        }
      } else {
        const whereUserInputClauseForLabel: Record<string, any> = {}
        whereUserInputClauseForLabel[relationshipColumnNameForLabel] = { [labelComparisonOperator]: `%${userInput}%` }

        return {
          _or: [whereUserInputClauseForLabel],
          _and: [where]
        }
      }
    } else if (userInput && !where) {
      // where clause as a prop is optional
      const whereClause: Record<string, any> = {}
      whereClause[relationshipColumnNameForLabel] = { _ilike: `%${userInput}%` }
      return whereClause
    } else if (!userInput && where) {
      // userInput empty but a where clause in place
      return where
    }
    return undefined
  }

  const getOptions = useCallback(async (): Promise<void> => {
    const constructedWhere = buildwhereClause(displayValue as string)

    await adapter?.infiniteManyQuery({ where: constructedWhere, limit: totalRecordsLimit }).then(({ data }: Record<string, any>) => {
      setNumberOfItems(data?.current?.length || 0)
      const items: any[] = data?.current?.map?.((item: Record<string, string>) => {
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

      if (items.length) {
        setResultsFound(true)
        setOptions(items)
      } else {
        setResultsFound(false)
        setOptions([])
      }
    })
  }, [adapter, relationshipColumnNameForLabel, relationshipColumnNameForValue, displayValue, where])

  const debounce = useDebounce(() => {
    if (!resultsFound) return
    getOptions()
  }, 500)

  const searchItemsLocal = (query: string) => {
    const userInput = query
    const _filteredItems: OptionProps[] = []

    if (userInput) {
      for (let i = 0; i < options!.length; i++) {
        const item = options![i]
        if (item.label.toLowerCase().indexOf(userInput.toLowerCase()) === 0) {
          _filteredItems.push(item)
        }
      }
    } else {
      for (let i = 0; i < options!.length; i++) {
        const item = options![i]
        // since we don't have a search query, we insert every item
        _filteredItems.push(item)
      }
    }

    if (_filteredItems.length > 0) {
      setFilteredItems(_filteredItems)
    } else {
      debounce() // as a last resort, it'll try to fetch the server
    }
  }

  const searchItems = useCallback(
    (event: AutoCompleteCompleteMethodParams) => {
      setResultsFound(true) // will make it try to hit the server again

      if (options?.length && filteredItems.length && !event.query) {
        const defaultResultsCopy = defaultResults?.map(res => res)
        setFilteredItems(defaultResultsCopy as any[])
      } else if (numberOfItems < totalRecordsLimit && event.query.length) {
        searchItemsLocal(event.query)
      } else {
        debounce()
      }
    },
    [options, filteredItems, numberOfItems, totalRecordsLimit]
  )

  useEffect(() => {
    if (displayValue && resultsFound) {
      searchItemsLocal(displayValue)
    } else if (options?.length) {
      setFilteredItems(options)
    } else if (!options?.length && !resultsFound) {
      // Got absolutely nothing
      setFilteredItems([])
    }
  }, [options, displayValue, resultsFound])

  useEffect(() => {
    if (!options) {
      getOptions()
    }
  }, [getOptions, options])

  useEffect(() => {
    if (options && !defaultResults) {
      setDefaultResults(options)
    }
  }, [options, defaultResults])

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
