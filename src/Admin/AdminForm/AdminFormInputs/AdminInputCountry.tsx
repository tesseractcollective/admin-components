import React, { useEffect, useState } from 'react'
import { AutoComplete, AutoCompleteCompleteMethodParams, AutoCompleteProps } from 'primereact/autocomplete'
import { Controller, useWatch } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { AdminInputBaseProps, buildClassName, validateProps } from '../AdminForm'
import _ from 'lodash'
import dataCountries from '../../data/countries.json'
import { AddressCountry } from '../../types'

const searchCountry = (
  query: string | AddressCountry
): {
  country: AddressCountry | undefined
  filteredCountries: AddressCountry[]
} => {
  if (query === undefined) {
    return { country: undefined, filteredCountries: dataCountries }
  }

  const normalizedQuery = typeof query === 'string' ? query.toLowerCase().trim() : query.name.toLowerCase().trim()

  let found: AddressCountry | undefined = dataCountries.find(
    country =>
      country.name.toLowerCase() === normalizedQuery ||
      country.iso3?.toLowerCase() === normalizedQuery ||
      country.code.toLowerCase() === normalizedQuery
  )
  const filteredCountries = dataCountries.filter(
    country =>
      country.name.toLowerCase().includes(normalizedQuery) ||
      country.iso3?.toLowerCase().includes(normalizedQuery) ||
      country.code.toLowerCase().includes(normalizedQuery)
  )
  if (filteredCountries.length === 1) {
    found = filteredCountries[0]
  }

  return { country: found, filteredCountries }
}

export type AdminInputCountryProps = AutoCompleteProps &
  AdminInputBaseProps & {
    defaultCountryCode?: string
    onCountrySelect?: (country?: AddressCountry) => void
    autofill?: boolean
  }

export const AdminInputCountry: React.FC<AdminInputCountryProps> = props => {
  validateProps(props)

  const { control, name, label, helpText, containerClassName, required, attributeType, defaultCountryCode, onCountrySelect, autofill, ...baseProps } =
    props

  const fieldValue = useWatch({ name, control })

  const [id] = useState(nanoid())
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [hasFocus, setHasFocus] = useState(false)
  const [currentInput, setCurrentInput] = useState(() => {
    const { country } = searchCountry(defaultCountryCode || '')
    return country?.name || ''
  })
  const [countries, setCountries] = useState<AddressCountry[]>(dataCountries)

  const nameValue = attributeType?.name || name
  const priorityLabel = attributeType?.label ?? label ?? name

  const countryOptionTemplate = (option: AddressCountry): JSX.Element => (
    <div className="flex items-center">
      <img
        alt={option.name}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.code.toLocaleUpperCase()}.svg`}
        width={25}
        className={`flag flag-${option.code.toLowerCase()} mr-3`}
      />
      <div className="mr-2">{option.name}</div>
      <div>({option.code})</div>
    </div>
  )

  const fieldProps = {
    ...baseProps,
    ...attributeType?.props
  }

  useEffect(() => {
    if (autofill !== false) {
      const countryInput = document.getElementById(id)?.firstElementChild
      if (countryInput) {
        countryInput.setAttribute('autocomplete', 'country')
      }
    }
  }, [autofill, id])

  useEffect(() => {
    if (fieldValue && !currentInput && isFirstRender) {
      const { country } = searchCountry(fieldValue)
      setCurrentInput(country?.name || '')
      onCountrySelect?.(country)
    } else if (fieldValue) {
      const { country } = searchCountry(fieldValue)
      setCurrentInput(country?.name || '')
      onCountrySelect?.(country)
    }
    setIsFirstRender(false)
  }, [fieldValue, currentInput, isFirstRender])

  return (
    <Controller
      control={control}
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
                delay={0}
                suggestions={countries}
                completeMethod={(e: AutoCompleteCompleteMethodParams) => {
                  setCurrentInput(e.query)
                  const { country, filteredCountries } = searchCountry(e.query)
                  setCountries(filteredCountries)
                  if (country) {
                    field.onChange(country.code)
                  }

                  if (!hasFocus) {
                    // is autofill
                    if (country) {
                      setCurrentInput(country.name)
                      setCountries([])
                    }
                  }
                }}
                itemTemplate={countryOptionTemplate}
                aria-label={nameValue}
                onChange={e => {
                  setCurrentInput(e.value?.name || e.value)
                  const { country } = searchCountry(e.value)
                  if (country) {
                    field.onChange(country.code)
                    if (currentInput !== country.name) {
                      onCountrySelect?.(country)
                    }
                  }
                  if (!e.value) {
                    field.onChange(null)
                  }
                }}
                onFocus={() => {
                  setHasFocus(true)
                }}
                onBlur={() => {
                  setHasFocus(false)
                  const { country } = searchCountry(currentInput)
                  if (country) {
                    field.onChange(country.code)
                    setCurrentInput(country.name || '')
                  } else {
                    setCurrentInput('')
                  }
                }}
              />

              <label htmlFor={nameValue} className="capitalize">
                {priorityLabel}
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
  )
}
