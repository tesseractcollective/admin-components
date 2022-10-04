import { DataTableRowClickEventParams, DataTableSelectParams } from 'primereact/datatable'
import { Address, Attribute } from './types'

export function valueForAttribute(attributes: Attribute[] | undefined, name: string): string {
  const attribute = attributes?.find(attr => attr.name === name)
  return attribute?.value || ''
}

export const rowToNewTab = (
  event: DataTableRowClickEventParams | DataTableSelectParams,
  route: string,
  onRowClick: (row: any, path?: string) => void
): void => {
  const originalEvent = event.originalEvent as any
  if (originalEvent.ctrlKey || originalEvent.metaKey) {
    window.open(route)
  } else {
    onRowClick?.(event?.data)
  }
}

export function addressSingleLineFormat(address: Address): string {
  let streets = address?.street1
  if (address?.street2) {
    streets += `, ${address?.street2}`
  }

  const formatedAddress = [streets, address?.city, address?.stateCode, address?.postalCode, address?.countryCode.toUpperCase()]
    .filter(Boolean)
    .join(', ')

  return formatedAddress
}

export function isEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return false
  }

  const keysA = Object.keys(obj1)
  const keysB = Object.keys(obj2)

  if (keysA.length !== keysB.length) {
    return false
  }

  let result = true

  keysA.forEach(key => {
    if (!keysB.includes(key)) {
      result = false
    }

    if (typeof obj1[key] === 'function' || typeof obj2[key] === 'function') {
      if (obj1[key].toString() !== obj2[key].toString()) {
        result = false
      }
    }

    if (!isEqual(obj1[key], obj2[key])) {
      result = false
    }
  })

  return result
}
