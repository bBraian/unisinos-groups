import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from "@/components/ui/sonner"

import { ThemeProvider } from './components/theme/theme-provider'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import { Router } from './Router'
import { BrowserRouter } from "react-router-dom"

export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <ThemeProvider storageKey="unigroups-theme" defaultTheme="dark">
              <Helmet titleTemplate="%s | Unisinos Groups" />
              <Toaster richColors />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}
