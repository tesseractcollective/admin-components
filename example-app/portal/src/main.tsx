import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import '@tesseractcollective/admin-components/dist/styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
