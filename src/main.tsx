import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './i18n'; // Import i18n configuration
import { ThemeProvider } from './components/ThemeProvider.tsx'

// Check if running as a Chrome Extension
const isExtension = window.location.protocol === 'chrome-extension:' || window.location.protocol === 'file:';
const Router = isExtension ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
)