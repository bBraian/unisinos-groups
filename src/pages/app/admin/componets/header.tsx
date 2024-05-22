import { Plus } from 'lucide-react'
import appLogo from '../assets/uni.png'

import { AccountMenu } from './account-menu'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img className="h-6 w-6" src={appLogo} alt="" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4"  />
            Novo grupo
          </Button>

        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
