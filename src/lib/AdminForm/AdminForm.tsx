import React, { useCallback, useEffect } from 'react'
import { classNames } from 'primereact/utils'
import { Control, RegisterOptions, useForm } from 'react-hook-form'
import { AttributeType } from '../types'

export interface AdminInputBaseProps {
  name: string
  control?: Control
  label?: string
  helpText?: string
  containerClassName?: string
  attributeType?: AttributeType
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
  onBlur?: () => void
  onChange?: () => void
  [key: string]: any
}

export interface AdminFormProps {
  className?: string
  children: React.ReactNode
  defaultValues?: Record<string, any>
  attributeTypes?: AttributeType[] | Record<string, AttributeType>
  onSubmit: (record: Record<string, any>) => void
  onInvalid?: (errors: any) => void
  shouldSubmit?: boolean
}

export const AdminForm: React.FC<AdminFormProps> = props => {
  const { className, children, defaultValues, attributeTypes: types, onSubmit, onInvalid, shouldSubmit } = props

  const formMethods = useForm<Record<string, any>>({ defaultValues })

  let attributeTypes: Record<string, AttributeType> = {}
  if (Array.isArray(types)) {
    types.forEach(type => {
      attributeTypes[type.name] = type
    })
  } else if (types) {
    attributeTypes = types
  }

  const { handleSubmit } = formMethods

  const handleShouldSubmit = useCallback((): void => {
    handleSubmit(
      e => onSubmit(e),
      e => onInvalid && onInvalid(e)
    )()
  }, [handleSubmit, onSubmit])

  useEffect(() => {
    if (shouldSubmit) handleShouldSubmit()
  }, [shouldSubmit])

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        const element = child as any
        const name = element?.props?.name

        return name
          ? React.createElement(element.type, {
              ...{
                ...element.props,
                control: formMethods.control,
                attributeType: attributeTypes[name],
                key: name
              }
            })
          : child
      })}
    </form>
  )
}

export function validateProps(props: AdminInputBaseProps & Record<string, any>): void {
  if (!props.control) {
    throw new Error('control prop required (control from React Hook Form')
  }
  if (props.attributeType && props.attributeType.name !== props.name) {
    throw new Error(`name ${props.name} does not match attribute type name ${props.attributeType.name}`)
  }
}

export function buildClassName(classNameFromProps: string | undefined, errorMessage?: string): string | undefined {
  return classNames(classNameFromProps, { 'w-full': !classNameFromProps }, { 'p-invalid': errorMessage })
}
