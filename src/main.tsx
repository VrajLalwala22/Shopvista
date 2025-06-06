import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

window.addEventListener('load', () => {
  try {
    const root = document.getElementById('root')
    if (!root) {
      throw new Error('Root element not found')
    }

    console.log('Starting to render app...')
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    // Display a user-friendly error message
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;">
        <div style="text-align: center;">
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    `
  }
}) 