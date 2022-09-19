import { useMemo } from 'react'
import { GraphQLClient } from 'graphql-request'
import { DocumentNode } from 'graphql'
import { HasuraDataAdapter, HasuraGraphQLNamingConvention, AdminTableHasuraAdapter, WhereClause } from '..'

const namingConvention: HasuraGraphQLNamingConvention = 'hasuraDefault'
const localGraphQLClientUrl = 'http://localhost:8080/v1/graphql'

export interface DataAdapters {
  dataAdapter: HasuraDataAdapter
  tableAdapter: AdminTableHasuraAdapter
}

export function useDataAdapter(typename: string, fieldsFragment: DocumentNode, baseWhere?: WhereClause, client?: GraphQLClient): DataAdapters {
  const graphQLClient = useMemo(() => client || new GraphQLClient(localGraphQLClientUrl), [client])
  const dataAdapter = useMemo(
    () => new HasuraDataAdapter(graphQLClient, typename, fieldsFragment, namingConvention),
    [typename, fieldsFragment, graphQLClient]
  )
  const tableAdapter = useMemo(() => new AdminTableHasuraAdapter(dataAdapter, baseWhere), [baseWhere, dataAdapter])
  return { dataAdapter, tableAdapter }
}
