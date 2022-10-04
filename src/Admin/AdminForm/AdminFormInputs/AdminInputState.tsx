import React, { useEffect, useRef, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteMethodParams, AutoCompleteProps } from 'primereact/autocomplete'
import { Controller } from 'react-hook-form'
import { useUserContext } from 'shared/UserContext'
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
  const filteredStates = states.filter(
    state => state.name.toLowerCase().includes(normalizedQuery) || state.code.toLowerCase().includes(normalizedQuery)
  )

  if (filteredStates.length === 1) {
    found = filteredStates[0]
  }

  return { state: found, filteredStates }
}

export type AdminInputStateProps = AutoCompleteProps &
  AdminInputBaseProps & {
    countryCode?: string
  }

const AdminInputState: React.FC<AdminInputStateProps> = props => {
  validateProps(props)

  const { control, name, label, helpText, containerClassName, required, attributeType, countryCode, defaultValue, ...baseProps } = props

  const toast = useRef<Toast>(null)

  const [id] = useState(nanoid())
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [hasFocus, setHasFocus] = useState(false)
  const [allStates, setAllStates] = useState<AddressState[]>([])
  const [states, setStates] = useState<AddressState[]>([])
  const [currentInput, setCurrentInput] = useState('')

  const nameValue = attributeType?.name || name
  const priorityLabel = attributeType?.label ?? label ?? name

  const fieldProps = {
    ...baseProps,
    ...attributeType?.props
  }

  const { sdkClient } = useUserContext()

  const stateOptionTemplate = (option: AddressState): JSX.Element => (
    <div className="flex items-center">
      <div className="mr-3">{option.name}</div>
      <div>{option.code}</div>
    </div>
  )

  useEffect(() => {
    if (countryCode) {
      sdkClient
        .addressStatesByCountryCode({ countryCode })
        .then(data => {
          const statesData = data.addressStatesByCountryCode || []
          setAllStates(statesData.sort((a, b) => a.name.localeCompare(b.name)))
        })
        .catch(() => {
          toast.current?.show({
            severity: 'error',
            summary: `No states for country code ${countryCode}`,
            life: 3000
          })
        })
    } else if (!isFirstRender) {
      setAllStates([])
      setCurrentInput('')
    }
  }, [sdkClient, countryCode, currentInput, isFirstRender])

  useEffect(() => {
    setIsFirstRender(false)
    const stateInput = document.getElementById(id)?.firstElementChild
    if (stateInput) {
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
      stateInput.setAttribute('autocomplete', 'address-level1')
    }
  }, [id])

  return (
    <>
      <Toast ref={toast} position="bottom-left" className="mb-36" />
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={nameValue}
        rules={{
          required,
          ...attributeType?.validation
        }}
        render={({ field, fieldState, formState: _formState }) => {
          if (field.value && !currentInput && isFirstRender) {
            setCurrentInput(field.value)
          }

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
                  delay={0}
                  suggestions={states}
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
                      setCurrentInput('')
                    }
                  }}
                />

                <label htmlFor={name} className="capitalize">
                  {priorityLabel || nameValue}
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

export default AdminInputState
