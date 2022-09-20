import { GraphQLClient } from 'graphql-request';
import { DocumentNode } from 'graphql';
import { HasuraDataAdapter, AdminTableHasuraAdapter } from '..';
import { WhereClause } from 'Admin/AdminTable/adminTableUtils';
export interface DataAdapters {
    dataAdapter: HasuraDataAdapter;
    tableAdapter: AdminTableHasuraAdapter;
}
export declare function useDataAdapter(typename: string, fieldsFragment: DocumentNode, baseWhere?: WhereClause, client?: GraphQLClient): DataAdapters;
