import { AdminComponentWrapper } from '@tesseractcollective/admin-components'
import UsersPage from './pages/UsersPage'
import { GraphQLClient } from 'graphql-request'
import Layout from './components/Layout/Layout'

const graphqlUrl = import.meta.env.VITE_APP_GRAPHQL_URL as string
const adminSecret = import.meta.env.VITE_APP_GRAPHQL_SECRET as string

const headers: RequestInit['headers'] = {
  'x-hasura-admin-secret': adminSecret
}
export const client = new GraphQLClient(graphqlUrl, { headers })

function App() {
  return (
    <AdminComponentWrapper client={client}>
      <Layout>
        <UsersPage />
      </Layout>
    </AdminComponentWrapper>
  )
}

export default App
