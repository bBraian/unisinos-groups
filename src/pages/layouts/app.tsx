import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 pt-6 px-4 lg:px-24 xl:px-40 2xl:px-72 ">
        <Outlet />
      </div>
    </div>
  )
}
