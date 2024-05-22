import { Outlet } from 'react-router-dom'
import uniBanner from '../../assets/uni.png'
import uniLogo from '../../assets/unisinos.png'

export function AuthLayout() {
  return (
    <div className="xl:grid flex items-center justify-center min-h-screen xl:grid-cols-2 antialiased">
      <div className="xl:flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground hidden">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <img className="h-5 w-5" src={uniLogo} alt="" />
          <span className="font-semibold">Unisinos Groups</span>
        </div>
        <div className='flex justify-center'>
          <img className='h-72 w-72' src={uniBanner} alt="" />
        </div>
        <footer className="text-sm">
          &copy; Unisinos Groups - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
