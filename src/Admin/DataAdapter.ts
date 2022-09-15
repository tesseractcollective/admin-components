import { DocumentNode, GraphQLSchema, Kind, print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { Client as WebSocketClient } from 'graphql-ws'

export interface DataAdapter {
  infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>>
}

export interface InfiniteQueryOptions {
  limit?: number
  offset?: number
  where?: Record<string, any>
  orderBy?: Record<string, any>
  distinctOn?: string[]
}

export interface InfiniteQueryResponse<T> {
  current: T[]
  aggregate: {
    aggregate: {
      count: number
    }
  }
}

export type HasuraGraphQLNamingConvention = 'hasuraDefault' | 'graphqlDefault'

export type SubscriptionCallback = (error: any, data?: Record<string, any>) => void

export class HasuraDataAdapter implements DataAdapter {
  client: GraphQLClient

  typename: string

  fieldsFragment: DocumentNode

  namingConvention: HasuraGraphQLNamingConvention

  schema?: GraphQLSchema

  webSocketClient?: WebSocketClient

  previousSubscriptionValue?: string

  constructor(
    client: GraphQLClient,
    typename: string,
    fieldsFragment: DocumentNode,
    namingConvention: HasuraGraphQLNamingConvention,
    schema?: GraphQLSchema,
    webSocketClient?: WebSocketClient
  ) {
    this.client = client
    this.typename = typename
    this.fieldsFragment = fieldsFragment
    this.namingConvention = namingConvention
    this.schema = schema
    this.webSocketClient = webSocketClient
  }

  infiniteManyQuery<T>(options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): Promise<GraphQLResponse<InfiniteQueryResponse<T>>> {
    return this.client.rawRequest<InfiniteQueryResponse<T>, InfiniteQueryOptions>(this.buildInfiniteManyQuery(fieldsFragmentOverride), options)
  }

  infiniteManySubscription(callback: SubscriptionCallback, options?: InfiniteQueryOptions, fieldsFragmentOverride?: DocumentNode): void {
    const query = this.buildInfiniteManyQuery(fieldsFragmentOverride, true)
    this.webSocketClient?.subscribe(
      {
        query,
        variables: options as any
      },
      {
        next: (value: any) => {
          const valueString = JSON.stringify(value)
          if (valueString !== this.previousSubscriptionValue) {
            this.previousSubscriptionValue = valueString
            callback(undefined, value.data)
          }
        },
        error: error => {
          callback(error, undefined)
        },
        complete: () => {}
      }
    )
  }

  unsubscribe(): void {
    this.webSocketClient?.terminate()
  }

  private buildInfiniteManyQuery(fieldsFragmentOverride?: DocumentNode, isSubscription = false): string {
    const fragmentDoc = fieldsFragmentOverride || this.fieldsFragment
    const fragmentDefinition = fragmentDoc.definitions.find(node => node.kind === Kind.FRAGMENT_DEFINITION)
    if (!fragmentDefinition || fragmentDefinition.kind !== Kind.FRAGMENT_DEFINITION) {
      throw new Error(`document node does not have a fragment ${print(fragmentDoc)}`)
    }
    const fieldsFragmentName = fragmentDefinition.name.value

    if (this.namingConvention === 'hasuraDefault') {
      return `
      ${isSubscription ? 'subscription' : 'query'} ${this.typename}List(
        $where: ${this.typename}_bool_exp
        $orderBy: [${this.typename}_order_by!]
        $offset: Int
        $limit: Int
        $distinctOn: [${this.typename}_select_column!]
      ) {
        current:${this.typename}(
          where: $where
          order_by: $orderBy
          offset: $offset
          limit: $limit
          distinct_on: $distinctOn
        ) {
          ...${fieldsFragmentName}
        }
        aggregate:${this.typename}_aggregate(
          where: $where
          distinct_on: $distinctOn
        ) {
          aggregate {
            count
          }
        }
      }
      ${print(fragmentDoc)}`
    }

    const typeNamePascal = this.typename[0].toUpperCase() + this.typename.slice(1)

    return `
    ${isSubscription ? 'subscription' : 'query'} ${this.typename}List(
      $where: ${typeNamePascal}BoolExp
      $orderBy: [${typeNamePascal}OrderBy!]
      $offset: Int
      $limit: Int
      $distinctOn: [${typeNamePascal}SelectColumn!]
    ) {
      current:${this.typename}(
        where: $where
        orderBy: $orderBy
        offset: $offset
        limit: $limit
        distinctOn: $distinctOn
      ) {
        ...${fieldsFragmentName}
      }
      aggregate:${this.typename}Aggregate(
        where: $where
        distinctOn: $distinctOn
      ) {
        aggregate {
          count
        }
      }
    }
    ${print(fragmentDoc)}`
  }
}
