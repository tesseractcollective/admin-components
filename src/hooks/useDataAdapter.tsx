import { useMemo, useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { DocumentNode } from 'graphql'
import { AdminComponentContext, HasuraDataAdapter, HasuraGraphQLNamingConvention, WhereClause } from '../Admin'
import { AdminTableHasuraAdapter } from '../Admin'

const namingConvention: HasuraGraphQLNamingConvention = 'graphqlDefault'

export interface DataAdapters {
  dataAdapter: HasuraDataAdapter
  tableAdapter: AdminTableHasuraAdapter
}

export function useDataAdapter(typename: string, fieldsFragment: DocumentNode, _client?: GraphQLClient, baseWhere?: WhereClause): DataAdapters {
  const { client } = useContext(AdminComponentContext)
  const gqlClient = _client || client
  const dataAdapter = useMemo(
    () => new HasuraDataAdapter(gqlClient, typename, fieldsFragment, namingConvention),
    [typename, fieldsFragment, gqlClient]
  )
  const tableAdapter = useMemo(() => new AdminTableHasuraAdapter(dataAdapter, baseWhere), [baseWhere, dataAdapter])
  return { dataAdapter, tableAdapter }
}
