import { ColumnBodyOptions } from 'primereact/column'
import { moneyFormat } from '../../utils/formatters'

export const dateBody = (data: any, options: ColumnBodyOptions): string => {
  if (!data) {
    return ''
  }
  return new Date(data[options.field]).toLocaleDateString()
}

export const dateTimeBody = (data: any, options: ColumnBodyOptions): string => {
  if (!data) {
    return ''
  }
  const time = new Date(data[options.field]).toLocaleTimeString()
  return `${dateBody(data, options)} ${time}`
}

export const moneyBody = (data: any, options: ColumnBodyOptions): string => {
  if (!data) {
    return ''
  }
  const value = data[options.field]
  return moneyFormat.format(parseFloat(value))
}
