import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'
import { SignIn } from './pages/auth/sign-in'
import { Home } from './pages/app/home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { path: '', element: <SignIn /> },
    ],
  },
  
  
])
