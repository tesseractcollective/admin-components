import React from 'react'

export default function ({ name }: { name: string }): JSX.Element {
  return <i className={`pi ${name} mt-2 mr-4`} style={{ fontSize: '1.5em', color: 'grey' }} />
}
