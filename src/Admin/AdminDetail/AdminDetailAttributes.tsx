import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Attribute, AttributeType } from '../types'
import { adminDetailForAttribute } from './AdminDetail'

export interface ValuesDetailProps {
  attributes: Attribute[]
  types?: AttributeType[]
  label?: string
  onEditButtonClick?: () => void
}

const AdminDetailAttributes: React.FC<ValuesDetailProps> = ({ attributes, types, label, onEditButtonClick }) => (
  <>
    <div style={{ width: '100%' }}>
      <Card>
        <>
          <div className="pt-1 font-semibold text-xl border-solid border-b-2 p-primary-border-color mb-3 justify-between w-full flex flex-row">
            {label}
            {onEditButtonClick && <Button label="Edit" icon="pi pi-pencil" className="p-button-text text-primary" onClick={onEditButtonClick} />}
          </div>
          {types
            ? types.map(type => {
                const attribute = attributes.find(a => a.name === type.name)
                return adminDetailForAttribute(attribute, { type })
              })
            : attributes.map(attribute => adminDetailForAttribute(attribute))}
        </>
      </Card>
    </div>
  </>
)

export default AdminDetailAttributes
