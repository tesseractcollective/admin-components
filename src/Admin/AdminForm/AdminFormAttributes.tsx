import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { adminInputsForAttributeTypes } from './AdminFormFields'
import { AdminForm, AdminInputBaseProps, Attribute, AttributeGroup, findTypeInGroups } from '..'

export interface AdminFormAttributesProps {
  attributes: Attribute[]
  groups: AttributeGroup[]
  shouldSave?: boolean
  onCompletion: (newAttributes: Attribute[]) => void
}

export const AdminFormAttributes: React.FC<AdminFormAttributesProps> = props => {
  const { attributes, groups, shouldSave, onCompletion } = props

  const defaultValues = attributes.reduce((attributesObj, attribute) => ({ ...attributesObj, ...{ [attribute.name]: attribute.value } }), {})

  const { control, getValues } = useForm({ defaultValues })

  const performSave = useCallback(() => {
    const data = getValues()
    const newAttributes = Object.keys(data).map(key => ({
      name: key,
      value: String(data[key as keyof typeof data]),
      type: findTypeInGroups(groups, key)!
    }))
    onCompletion(newAttributes)
  }, [getValues, onCompletion, groups])

  const fields = (): React.FC<AdminInputBaseProps>[] => {
    const fieldsArr: any = []
    groups.forEach(group => fieldsArr.push(adminInputsForAttributeTypes(group?.types as any, { control })))
    return fieldsArr
  }

  useEffect(() => {
    if (shouldSave) {
      performSave()
    }
  }, [shouldSave])

  return (
    <>
      <AdminForm onSubmit={performSave} className="mt-4 ml-2">
        <div className="grid grid-cols-1 gap-y-7 justify-items-stretch">{...fields()}</div>
        {shouldSave === undefined && (
          <div className="pt-3 pb-3">
            <Button label="Save" className="p-button-primary" type="submit" />
          </div>
        )}
      </AdminForm>
    </>
  )
}
