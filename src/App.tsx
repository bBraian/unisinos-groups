import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'
import { AppProvider } from './context/AppContext'

export function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <ThemeProvider storageKey="unigroups-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | Unisinos Groups" />
          <Toaster richColors />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AppProvider>
    </HelmetProvider>
  )
}
