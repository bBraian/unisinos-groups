import appLogo from '../assets/uni.png'

import { ToggleCourses } from './toggle-courses'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'
import { NewClassDialog } from './new-class-dialog'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-2 px-6">
        <Link to="/">
          <img className="h-6 w-6" src={appLogo} alt="" />
        </Link>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NewClassDialog />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <ToggleCourses />
        </div>
      </div>
    </div>
  )
}
