import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SitePreferencesProvider } from './context/SitePreferencesContext'
import { AccessToolbar } from './components/ui/AccessToolbar'
import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import './index.css'

// Prevenir que el browser restaure la posición de scroll anterior al navegar —
// esto causa el flash de "datos reales" antes de que la app tome control.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// Entrada limpia en home: sin ?product= pegado y scroll arriba antes de React.
if (window.location.pathname === '/' && window.location.hash !== '#buy') {
  if (window.location.search) {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash)
  }
  window.scrollTo(0, 0)
}

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
