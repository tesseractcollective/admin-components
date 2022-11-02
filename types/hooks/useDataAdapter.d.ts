import { GraphQLClient } from 'graphql-request';
import { DocumentNode } from 'graphql';
import { HasuraDataAdapter, WhereClause } from '../Admin';
import { AdminTableHasuraAdapter } from '../Admin';
export interface DataAdapters {
    dataAdapter: HasuraDataAdapter;
    tableAdapter: AdminTableHasuraAdapter;
}
export declare function useDataAdapter(typename: string, fieldsFragment: DocumentNode, _client?: GraphQLClient, baseWhere?: WhereClause): DataAdapters;
