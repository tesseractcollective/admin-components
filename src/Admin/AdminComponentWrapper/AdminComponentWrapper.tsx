import { GraphQLClient } from 'graphql-request'
import React, { createContext } from 'react'

interface Props {
  children: React.ReactNode
  client: GraphQLClient
}

interface IAdminComponentContext {
  client?: GraphQLClient
}

export const AdminComponentContext = createContext<IAdminComponentContext>({})

export const AdminComponentWrapper: React.FC<Props> = props => {
  const { children, client } = props
  return (
    <AdminComponentContext.Provider
      value={{
        client
      }}
    >
      {children}
    </AdminComponentContext.Provider>
  )
}
