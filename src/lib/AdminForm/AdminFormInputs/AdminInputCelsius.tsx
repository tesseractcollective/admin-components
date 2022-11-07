import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber, InputNumberProps } from 'primereact/inputnumber'
import { classNames } from 'primereact/utils'
import { Controller, useController } from 'react-hook-form'
import { AdminInputBaseProps, validateProps } from '../AdminForm'

export type AdminInputCeslisusProps = AdminInputBaseProps &
  Omit<InputNumberProps, 'disabled'> & {
    mode?: 'celsius' | 'fahrenheit'
    inputMode?: 'decimal' | 'currency'
    disabled?: boolean
  }

export type AdminInputOption = {
  label: string
  value: number
}

export const AdminInputCelsius: React.FC<AdminInputCeslisusProps> = props => {
  validateProps(props)
  const {
    control,
    name,
    label,
    helpText,
    containerClassName,
    required,
    attributeType,
    mode,
    inputMode,
    className,
    disabled,
    defaultValue,
    onBlur,
    ...baseProps
  } = props

  const {
    field: { value }
  } = useController({
    name,
    control
  })

  const priorityLabel = attributeType?.label ?? label ?? name

  const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState<'celsius' | 'fahrenheit'>(mode || 'celsius')
  const [inputValue, setInputValue] = useState<number | null>(selectedTemperatureUnit === 'celsius' ? value?.celsius : value?.fahrenheit || null)

  const options = [
    { label: 'Celsius', value: 'celsius' },
    { label: 'Fahrenheit', value: 'fahrenheit' }
  ]

  useEffect(() => {
    const inputField = document.getElementById(name)?.firstElementChild
    if (inputField) {
      inputField.setAttribute('autocomplete', name)
    }
  }, [name])

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
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <div className=" w-full">
                <div className="p-float-label">
                  <InputNumber
                    id={name}
                    {...{ ...attributeType?.props, ...baseProps }}
                    className={classNames(className, { 'p-invalid': errorMessage })}
                    value={inputValue}
                    prefix="&uarr; "
                    suffix={selectedTemperatureUnit === 'celsius' ? '℃' : '℉'}
                    onChange={e => {
                      setInputValue(e.value)

                      if (e.value === null || e.value === undefined) {
                        field.onChange(null)
                        return
                      }

                      field.onChange({
                        celsius:
                          selectedTemperatureUnit === 'celsius'
                            ? e.value
                            : e.value === null || e.value === undefined
                            ? null
                            : parseFloat((((e.value - 32) * 5) / 9).toFixed(2)),
                        fahrenheit:
                          selectedTemperatureUnit === 'fahrenheit'
                            ? e.value
                            : e.value === null || e.value === undefined
                            ? null
                            : parseFloat(((e.value * 9) / 5 + 32).toFixed(2))
                      })
                    }}
                    onBlur={() => {
                      field.onBlur()
                      onBlur && onBlur()
                    }}
                    mode={inputMode || 'decimal'}
                    minFractionDigits={2}
                    disabled={disabled}
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

              <Dropdown
                className={classNames(className, { 'p-invalid': errorMessage })}
                style={{ maxHeight: '50px' }}
                value={selectedTemperatureUnit}
                options={options}
                onChange={e => {
                  setSelectedTemperatureUnit(e.value)

                  field.onChange({
                    celsius:
                      e.value === 'celsius'
                        ? inputValue
                        : inputValue === null || inputValue === undefined
                        ? null
                        : parseFloat((((inputValue - 32) * 5) / 9).toFixed(2)),
                    fahrenheit:
                      e.value === 'fahrenheit'
                        ? inputValue
                        : inputValue === null || inputValue === undefined
                        ? null
                        : parseFloat(((inputValue * 9) / 5 + 32).toFixed(2))
                  })
                }}
                optionLabel="label"
                optionValue="value"
                placeholder="Select temperature unit"
                disabled={disabled}
              />
            </div>
          </div>
        )
      }}
    />
  )
}
