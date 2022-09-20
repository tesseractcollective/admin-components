import { DocumentNode, GraphQLSchema } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { GraphQLResponse } from 'graphql-request/dist/types';
import { Client as WebSocketClient } from 'graphql-ws';
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
export declare type SubscriptionCallback = (error: any, data?: Record<string, any>) => void;
export declare class HasuraDataAdapter implements DataAdapter {
    client: GraphQLClient;
    typename: string;
    fieldsFragment: DocumentNode;
    namingConvention: HasuraGraphQLNamingConvention;
    schema?: GraphQLSchema;
    webSocketClient?: WebSocketClient;
    previousSubscriptionValue?: string;
    constructor(client: GraphQLClient, typename: string, fieldsFragment: DocumentNode, namingConvention: HasuraGraphQLNamingConvention, schema?: GraphQLSchema, webSocketClient?: WebSocketClient);
    infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>;
    infiniteManySubscription(callback: SubscriptionCallback, options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): void;
    unsubscribe(): void;
    private buildInfiniteManyQuery;
}
