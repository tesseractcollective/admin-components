export function dateFormat(date: string): string {
  const dateToFormat = new Date(date.replace(/-/g, '/')) // Safari doesn't support - in dates
  const split = dateToFormat.toDateString().slice(4).split(' ')
  return `${split[0]} ${split[1]}, ${split[2]}`
}

export function formatDateString(date: string): string {
  const dateStringOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit'
  }
  return new Date(date).toLocaleDateString(undefined, dateStringOptions)
}

export const moneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})
