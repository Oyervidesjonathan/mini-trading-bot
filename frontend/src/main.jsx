import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application Entry Point
 * ----------------------
 * Initializes the React application and mounts the root App component
 * to the DOM. Wraps the application in StrictMode for development
 * checks and best practices.
 */

// Create React root and render application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)