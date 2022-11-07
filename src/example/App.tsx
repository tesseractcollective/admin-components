import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";

import UsersPage from "./pages/UsersPage";
import Layout from "./components/Layout";
import { AdminComponentWrapper } from "../lib";
import "../lib/styles/index.css";

const graphqlUrl = "https://tesseract-example.hasura.app/v1/graphql";
export const client = new GraphQLClient(graphqlUrl);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminComponentWrapper client={client}>
        <Layout>
          <UsersPage />
        </Layout>
      </AdminComponentWrapper>
    </QueryClientProvider>
  );
}

export default App;
