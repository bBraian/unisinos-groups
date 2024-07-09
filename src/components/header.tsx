import appLogo from '../assets/uni.png'

import { ToggleCourses } from './toggle-courses'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'
import { NewClassDialog } from './new-class-dialog'
import { Link } from 'react-router-dom'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Button } from './ui/button'

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
          <div className='hidden sm:flex md:flex gap-2 items-center '>
            <ThemeToggle />
            <ToggleCourses />
          </div>

          <div className='flex sm:hidden md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                  <Menu className="h-4 w-4"/>
                </Button>
                
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                  <ThemeToggle />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                  <ToggleCourses />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </div>
  )
}
