import React from 'react'

export function LabelValue({ label, value }: { label: string; value: string | JSX.Element | null | undefined }) {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-x-4 gap-y-2 mb-2">
      <div className="font-bold text-right">{label}:</div>
      <div className="text-left">{value}</div>
    </div>
  )
}
