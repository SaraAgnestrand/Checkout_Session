import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CustomerProvider from './context/CustomerContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomerProvider>
    <App />
    </CustomerProvider>
  </React.StrictMode>,
)
