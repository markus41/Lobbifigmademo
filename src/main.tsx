import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { LobbiThemeProvider } from './theme/ThemeProvider.v3'
import App from './app/App'
import './lib/gsap-config'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LobbiThemeProvider defaultOrg="luxe-haven" defaultMode="light">
      <App />
      <Toaster position="top-right" richColors closeButton />
    </LobbiThemeProvider>
  </StrictMode>
)
