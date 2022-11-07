import React, { useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'
import { Chips as PrimeChips, ChipsProps } from 'primereact/chips'
import { AdminInputBaseProps, buildClassName, validateProps } from '../../AdminForm'
import { enterEvent } from './enterEvent'
import './AdminInputChips.scss'

type IChipsProps = Omit<ChipsProps, 'value' | 'onChange'>

export type AdminChipsInputProps = IChipsProps &
  AdminInputBaseProps & {
    required?: boolean
  }

export const AdminInputChips: React.FC<AdminChipsInputProps> = props => {
  validateProps(props)
  const { control, name, label, helpText, containerClassName, attributeType, required, defaultValue, onBlur, ...baseProps } = props

  const priorityLabel = attributeType?.label ?? label ?? name

  const inputRef = useRef<HTMLInputElement>(null)

  const triggerEnterEvent = (): void => {
    inputRef.current?.dispatchEvent(enterEvent)
  }

  useEffect(() => {
    const input = inputRef.current

    input?.addEventListener('blur', triggerEnterEvent)

    return () => {
      input?.removeEventListener('blur', triggerEnterEvent)
    }
  }, [])

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{ required, ...attributeType?.validation }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        const value = field.value ? field.value.split(',') : []

        return (
          <div className={containerClassName}>
            <div className="p-float-label field-chips-container">
              <PrimeChips
                {...baseProps}
                id={name}
                className={buildClassName(baseProps.className, errorMessage)}
                value={value}
                onBlur={() => {
                  field.onBlur()
                  onBlur && onBlur()
                }}
                onChange={e => field.onChange(e.value.join(','))}
                inputRef={inputRef}
                ref={field.ref}
                separator=","
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
