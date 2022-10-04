import React from 'react'

interface Props {
  children: React.ReactNode
}

export const AdminWrapper: React.FC<Props> = props => {
  const { children } = props
  return <div>{children}</div>
}
