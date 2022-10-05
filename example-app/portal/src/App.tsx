import { AdminComponentWrapper } from '../../../src'
import './App.css'
import UsersPage from './pages/UsersPage'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = 'https://tesseract-example.hasura.app/v1/graphql'
const adminSecret = 'jtW40EkPbgIadAVvoK1FImsNAiYEVYRAi7Xwfu9JPgSPI1Lxmophq0JBdAsdt7mx'

const headers: RequestInit['headers'] = {
  'x-hasura-admin-secret': adminSecret
}
const client = new GraphQLClient(graphqlUrl, { headers })

function App() {
  return (
    <AdminComponentWrapper client={client}>
      <UsersPage />
    </AdminComponentWrapper>
  )
}

export default App
