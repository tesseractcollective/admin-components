import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Attribute, AttributeGroup } from '../types'
import { adminDetailForAttribute } from './AdminDetail'

export interface AdminDetailAttributesProps {
  attributes: Attribute[]
  groups: AttributeGroup[]
  onEditButtonClick?: () => void
}

export const AdminDetailAttributes: React.FC<AdminDetailAttributesProps> = ({ attributes, groups, onEditButtonClick }) => (
  <>
    <div style={{ width: '100%' }}>
      {groups?.map((group, index) => (
        <Card key={group.name}>
          <div className="pt-1 font-semibold text-xl border-solid border-b-2 p-primary-border-color mb-3 justify-between w-full flex flex-row">
            {group.label || group.name}
            {index === 0 && onEditButtonClick && (
              <Button label="Edit" icon="pi pi-pencil" className="p-button-text text-primary" onClick={onEditButtonClick} />
            )}
          </div>
          <div className="grid grid-cols-1 gap-y-3">
            {group.types.map(type => {
              const attribute = attributes.find(a => a.name === type.name)
              return <>{adminDetailForAttribute(attribute, { type, key: `${group.name + type.name}` })}</>
            })}
          </div>
        </Card>
      ))}
    </div>
  </>
)
