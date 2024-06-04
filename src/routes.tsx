import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'
import { SignIn } from './pages/auth/sign-in'
import { Home } from './pages/app/home'
import { AdminLayout } from './pages/layouts/admin'
import { Admin } from './pages/app/admin'
import { Feedback } from './pages/app/feedback'

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
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Admin /> },
    ],
  },
  {
    path: '/feedback',
    element: <Feedback />,
  }
  
  
])
