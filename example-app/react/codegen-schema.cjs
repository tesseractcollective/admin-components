const env = process.argv[4] || 'dev'
const config = require(`../secrets/secrets-${env}.json`) || {}

const generates = {}
const remoteSchema = [
  {
    [`${config.HASURA_GRAPHQL_ENDPOINT}/v1/graphql`]: {
      headers: {
        'x-hasura-admin-secret': config.HASURA_GRAPHQL_ADMIN_SECRET
      }
    }
  }
]

// Only need when there are Hasura API changes
if (config.HASURA_GRAPHQL_ENDPOINT && config.HASURA_GRAPHQL_ADMIN_SECRET) {
  generates['../graphql/generated/schema.graphql'] = {
    schema: remoteSchema,
    plugins: ['schema-ast']
  }
  generates['src/graphql/generated/schema.json'] = {
    schema: remoteSchema,
    plugins: ['introspection']
  }
  generates['src/graphql/generated/schema.graphql'] = {
    schema: remoteSchema,
    plugins: ['schema-ast']
  }
}

module.exports = {
  documents: ['../graphql/*.graphql'],
  overwrite: true,
  generates
}
