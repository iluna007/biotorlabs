import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SitePreferencesProvider } from './context/SitePreferencesContext'
import { AccessToolbar } from './components/ui/AccessToolbar'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SitePreferencesProvider>
      <BrowserRouter>
        <AccessToolbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/nosotros" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </SitePreferencesProvider>
  </React.StrictMode>,
)
