const generates = {
  ['src/graphql/generated/resourceApi.ts']: {
    schema: '../graphql/generated/schema.graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
    config: {
      fetcher: 'graphql-request',
      documentMode: 'documentNode'
    }
  },
  ['src/graphql/generated/graphqlRequest.ts']: {
    schema: '../graphql/generated/schema.graphql',
    plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request']
  }
}

module.exports = {
  documents: ['../graphql/*.graphql'],
  overwrite: true,
  generates
}
