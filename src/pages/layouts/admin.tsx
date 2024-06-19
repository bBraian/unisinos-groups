import { Outlet } from 'react-router-dom'

import { Header } from '@/pages/app/admin/componets/header'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 gap-4 pt-6 px-4 lg:px-24 xl:px-40 2xl:px-72 w-full justify-center">
        <Outlet />
      </div>
    </div>
  )
}
