import { FileSliders, GitPullRequestArrow, GraduationCap, Home, MessageSquareText, Users } from 'lucide-react'
import appLogo from '../../../../assets/uni.png'

import { AccountMenu } from './account-menu'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Separator } from '@/components/ui/separator'
import { NavLink } from './nav-link'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-4 px-4 sm:gap-6 sm:px-6">
        <Link to="/" className="shrink-0">
          <img className="h-6 w-6" src={appLogo} alt="" />
        </Link>

        <Separator orientation="vertical" className="h-6" />
        <nav className="flex min-w-0 items-center space-x-4 overflow-x-auto lg:space-x-6">
          <NavLink to="/admin">
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/groups">
            <Users className="h-4 w-4" />
            Grupos
          </NavLink>
          <NavLink to="/admin/courses">
            <GraduationCap className="h-4 w-4" />
            Cursos
          </NavLink>
          <NavLink to="/admin/pr">
            <GitPullRequestArrow className="h-4 w-4" />
            Pull Requests
          </NavLink>
          <NavLink to="/admin/feedback">
            <MessageSquareText className="h-4 w-4" />
            Feedbacks
          </NavLink>
          <NavLink to="/admin/logs">
            <FileSliders className="h-4 w-4" />
            Logs
          </NavLink>
          
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
