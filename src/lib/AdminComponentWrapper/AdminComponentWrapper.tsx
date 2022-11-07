import React, { createContext } from 'react'
import { GraphQLClient } from 'graphql-request'
interface Props {
  children: React.ReactNode
  client: GraphQLClient
}

interface IAdminComponentContext {
  client: GraphQLClient
}

export const AdminComponentContext = createContext<IAdminComponentContext>({
  client: new GraphQLClient(''),
})

export const AdminComponentWrapper: React.FC<Props> = props => {
  const { children, client } = props

  const defaultContext: IAdminComponentContext = {
    client,
  }

  return (
    <AdminComponentContext.Provider value={defaultContext}>
      {children}
    </AdminComponentContext.Provider>
  )
}
