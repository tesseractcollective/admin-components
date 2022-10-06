import { AdminComponentWrapper } from '../../../src'
import UsersPage from './pages/UsersPage'
import { GraphQLClient } from 'graphql-request'
import Layout from './components/Layout/Layout'

const graphqlUrl = 'https://tesseract-example.hasura.app/v1/graphql'
const adminSecret = 'jtW40EkPbgIadAVvoK1FImsNAiYEVYRAi7Xwfu9JPgSPI1Lxmophq0JBdAsdt7mx'

const headers: RequestInit['headers'] = {
  'x-hasura-admin-secret': adminSecret
}
const client = new GraphQLClient(graphqlUrl, { headers })

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
