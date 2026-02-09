import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LobbiMantineProvider } from './theme/LobbiMantineProvider'
import App from './app/App'
import './lib/gsap-config'

// Mantine core styles
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/code-highlight/styles.css'
import '@mantine/nprogress/styles.css'

// Project styles (after Mantine so they can override)
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LobbiMantineProvider defaultOrg="luxe-haven" defaultMode="light">
      <App />
    </LobbiMantineProvider>
  </StrictMode>
)
