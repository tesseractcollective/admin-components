import React, { useEffect, useRef, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteMethodParams, AutoCompleteProps } from 'primereact/autocomplete'
import { Controller, useWatch } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { Toast } from 'primereact/toast'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'
import { AddressState } from '../../types'

const searchState = (
  query: string | undefined | AddressState,
  states: AddressState[]
): {
  state: AddressState | undefined
  filteredStates: AddressState[]
} => {
  if (query === undefined) {
    return { state: undefined, filteredStates: states }
  }

  const normalizedQuery = typeof query === 'string' ? query.toLowerCase().trim() : query.code?.toLowerCase().trim()

  let found = states.find(state => state.name.toLowerCase() === normalizedQuery || state.code.toLowerCase() === normalizedQuery)
  let filteredStates = states.filter(
    state => state.name.toLowerCase().startsWith(normalizedQuery) || state.code.toLowerCase().startsWith(normalizedQuery)
  )

  if (filteredStates.length === 1) {
    found = filteredStates[0]
  }
  if (filteredStates.length === 0) {
    filteredStates = states
  }

  return { state: found, filteredStates }
}

export type AdminInputStateProps = AutoCompleteProps &
  AdminInputBaseProps & {
    countryCode: string
  }

export const AdminInputState: React.FC<AdminInputStateProps> = props => {
  validateProps(props)

  const { control, name, label, helpText, containerClassName, required, attributeType, countryCode, defaultValue, ...baseProps } = props

  const toast = useRef<Toast>(null)
  const fieldValue = useWatch({ name, control })

  const [id] = useState(nanoid())
  const [hasFocus, setHasFocus] = useState(false)
  const [_isLoading, setIsLoading] = useState(true)
  const [allStates, setAllStates] = useState<AddressState[]>([])
  const [states, setStates] = useState<AddressState[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [shouldShowEmptyMessage, setShouldShowEmptyMessage] = useState<boolean>(false)

  const nameValue = attributeType?.name || name
  const priorityLabel = attributeType?.label ?? label ?? name

  const fieldProps = {
    ...baseProps,
    ...attributeType?.props
  }

  const stateOptionTemplate = (option: AddressState): JSX.Element => (
    <div className="flex items-center">
      <div className="mr-3">{option.name}</div>
      <div>{option.code}</div>
    </div>
  )

  useEffect(() => {
    if (countryCode) {
      setIsLoading(true)

      fetch(`https://geo.tesseractcollective.com/states/${countryCode}.json`)
        .then(response => response.json())
        .then((statesResponse: AddressState[]) => {
          setIsLoading(false)
          setShouldShowEmptyMessage(false)
          setAllStates(statesResponse)
          setStates(statesResponse)

          if (!statesResponse.length) {
            toast.current?.show({
              severity: 'info',
              life: 5000,
              summary: 'No states/regions found',
              detail: `Oops! Something went wrong and we can't find states/regions for ${countryCode}`
            })
            setShouldShowEmptyMessage(true)
          }
        })
        .catch(error => {
          console.log(error)
          toast.current?.show({
            severity: 'error',
            summary: 'Error Message',
            detail: error.message
          })
          setIsLoading(false)
        })
    } else {
      setAllStates([])
      setCurrentInput('')
    }
  }, [countryCode])

  useEffect(() => {
    const stateInput = document.getElementById(id)?.firstElementChild
    if (stateInput) {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
      stateInput.setAttribute('autocomplete', 'address-level1')
    }
  }, [id])

  useEffect(() => {
    if (fieldValue && !currentInput) {
      const { state } = searchState(fieldValue, allStates)
      if (state) {
        setCurrentInput(state?.name)
      }
    }
  }, [fieldValue, currentInput, states])

  return (
    <>
      <Toast ref={toast} position="top-center" className="mb-36" />
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={nameValue}
        rules={{
          required,
          ...attributeType?.validation
        }}
        render={({ field, fieldState, formState: _formState }) => {
          const errorMessage = fieldState.error?.message || fieldState.error?.type

          return (
            <div className={containerClassName}>
              <div className="p-float-label">
                <AutoComplete
                  {...fieldProps}
                  id={id}
                  className={buildClassName(fieldProps.className, errorMessage)}
                  value={currentInput}
                  field="name"
                  dropdown
                  delay={300}
                  suggestions={states.length ? states : []}
                  forceSelection
                  showEmptyMessage={shouldShowEmptyMessage}
                  emptyMessage="No states/regions found"
                  completeMethod={(e: AutoCompleteCompleteMethodParams) => {
                    setCurrentInput(e.query)
                    const { state, filteredStates } = searchState(e.query, allStates)
                    if (state) {
                      field.onChange(state.code)
                    }
                    setStates(filteredStates)

                    if (!hasFocus) {
                      // is autofill
                      if (state) {
                        setCurrentInput(state.name)
                        // Set empty array due to it showing dropdown whenever
                        // completeMethod is called and suggestions are set.
                        // If suggestions are not set, it shows the loading
                        // spinner forever
                        setStates([])
                      }
                    }
                  }}
                  itemTemplate={stateOptionTemplate}
                  aria-label={nameValue}
                  onChange={e => {
                    setCurrentInput(e.value)
                    if (!e.value) {
                      field.onChange(null)
                    }
                  }}
                  onFocus={() => {
                    setHasFocus(true)
                  }}
                  onBlur={() => {
                    setHasFocus(false)
                    const { state } = searchState(currentInput, allStates)
                    if (state) {
                      field.onChange(state.code)
                      setCurrentInput(state.name || '')
                    } else {
                      field.onChange('')
                      setCurrentInput('')
                    }
                  }}
                />

                <label htmlFor={name} className="capitalize">
                  {priorityLabel || nameValue}
                  {required && ' *'}
                </label>
              </div>
              <small id={`${nameValue}-help`} className="p-d-block">
                {helpText}
              </small>
              <small className="p-error p-d-block">{errorMessage}</small>
            </div>
          )
        }}
      />
    </>
  )
}
