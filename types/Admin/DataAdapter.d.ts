import { DocumentNode, GraphQLSchema } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLResponse } from 'graphql-request/dist/types';
export interface DataAdapter {
    infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>;
}
export interface InfiniteQueryOptions {
    limit?: number;
    offset?: number;
    where?: Record<string, any>;
    orderBy?: Record<string, any>;
    distinctOn?: string[];
}
export interface InfiniteQueryResponse<T> {
    current: T[];
    aggregate: {
        aggregate: {
            count: number;
        };
    };
}
export declare type HasuraGraphQLNamingConvention = 'hasuraDefault' | 'graphqlDefault';
export declare class HasuraDataAdapter implements DataAdapter {
    client: GraphQLClient;
    typename: string;
    fieldsFragment: DocumentNode;
    namingConvention: HasuraGraphQLNamingConvention;
    schema?: GraphQLSchema;
    constructor(client: GraphQLClient, typename: string, fieldsFragment: DocumentNode, namingConvention: HasuraGraphQLNamingConvention, schema?: GraphQLSchema);
    infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>;
    private buildInfiniteManyQuery;
}
