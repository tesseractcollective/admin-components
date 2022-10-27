import React from 'react'
import ReactPhoneInput2 from 'react-phone-input-2'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/style.css'
import { Controller } from 'react-hook-form'
import { AdminInputBaseProps, validateProps } from '../../AdminForm'
import './AdminInputPhone.scss'

export type AdminInputPhoneProps = AdminInputBaseProps & {
  number?: string
  required?: boolean
}

const ReactPhoneInput = (ReactPhoneInput2 as any).default ? (ReactPhoneInput2 as any).default : ReactPhoneInput2

export const AdminInputPhone: React.FC<AdminInputPhoneProps> = props => {
  validateProps(props)
  const { control, name, helpText, containerClassName, required, attributeType, defaultValue, onBlur, ...baseProps } = props
  const validatePhoneNumber = (number?: string): boolean | string =>
    number ? (isValidPhoneNumber(`+${number}`) ? true : 'Invalid Phone format') : true

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        required,
        validate: validatePhoneNumber,
        ...attributeType?.validation
      }}
      render={({ field, fieldState, formState: _formState }) => {
        const errorMessage = fieldState.error?.message || fieldState.error?.type

        return (
          <div className={containerClassName}>
            <ReactPhoneInput
              {...baseProps}
              enableSearch
              inputStyle={{
                color: 'var(--text-color)',
                width: '100%',
                background: 'var(--form-background)',
                border: `1px solid ${errorMessage ? 'var(--form-error-border)' : 'var(--form-border)'}`,
                padding: '0.5rem 0.5rem 0.5rem 3.5rem',
                fontSize: '1rem',
                height: '3.2rem'
              }}
              dropdownStyle={{
                color: 'var(--text-color)',
                background: 'var(--form-background)',
                border: '1px solid var(--form-border)',
                padding: '0.5rem',
                fontSize: '1rem'
              }}
              searchClass="search-container"
              searchStyle={{
                color: 'var(--text-color)',
                background: 'var(--form-background)',
                border: '1px solid var(--form-border)',
                padding: '0.5rem',
                fontSize: '1rem',
                height: '3.2rem'
              }}
              buttonClass="button-container"
              buttonStyle={{
                color: 'var(--text-color)',
                border: `1px solid ${errorMessage ? 'var(--form-error-border)' : 'var(--form-border)'}`,
                fontSize: '1rem'
              }}
              country="us"
              ref={field.ref}
              preferredCountries={['us']}
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur()
                onBlur && onBlur()
              }}
              isValid={!!errorMessage}
            />

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
