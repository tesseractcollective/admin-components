import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AdminWrapper } from './../../../src/Admin'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AdminWrapper>
      <App />
    </AdminWrapper>
  </React.StrictMode>
)
