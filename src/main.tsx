import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

// Add error logging
const renderApp = () => {
  try {
    console.log('Starting to render app...')
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
  }
}

renderApp() 