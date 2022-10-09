import { useMemo } from 'react'
import { GraphQLClient } from 'graphql-request'
import { DocumentNode } from 'graphql'
import { HasuraDataAdapter, HasuraGraphQLNamingConvention, WhereClause } from '../Admin'
import { AdminTableHasuraAdapter } from '../Admin'

const namingConvention: HasuraGraphQLNamingConvention = 'graphqlDefault'

export interface DataAdapters {
  dataAdapter: HasuraDataAdapter
  tableAdapter: AdminTableHasuraAdapter
}

export function useDataAdapter(typename: string, fieldsFragment: DocumentNode, client: GraphQLClient, baseWhere?: WhereClause): DataAdapters {
  const dataAdapter = useMemo(() => new HasuraDataAdapter(client, typename, fieldsFragment, namingConvention), [typename, fieldsFragment, client])
  const tableAdapter = useMemo(() => new AdminTableHasuraAdapter(dataAdapter, baseWhere), [baseWhere, dataAdapter])
  return { dataAdapter, tableAdapter }
}
