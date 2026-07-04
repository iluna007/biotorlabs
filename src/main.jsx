import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SitePreferencesProvider } from './context/SitePreferencesContext'
import { AccessToolbar } from './components/ui/AccessToolbar'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import './index.css'

// NOTA: StrictMode removido intencionalmente.
// React 19 StrictMode ejecuta useLayoutEffect dos veces,
// lo que llama a renderer.dispose() en el canvas WebGL
// antes de que Three.js pueda re-inicializarlo correctamente,
// dejando el canvas en blanco permanentemente.

ReactDOM.createRoot(document.getElementById('root')).render(
  <SitePreferencesProvider>
    <BrowserRouter>
      <AccessToolbar />
      <Routes>
        <Route path="/"         element={<App />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/productos/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </SitePreferencesProvider>
)
