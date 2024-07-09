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
import { Menu, MessagesSquare } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
  function handleCallSupport() {
    window.open("https://api.whatsapp.com/send?phone=5551996268989");
  }
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
                <div className="flex flex-col items-end gap-4 py-4">
                  <div className="flex gap-4">
                    <ToggleCourses />
                    <ThemeToggle />
                  </div>
                  <div className="w-full">
                    <Button variant="outline" className='w-full' onClick={handleCallSupport}>
                      <MessagesSquare className="mr-2 h-4 w-4"/>
                      Suporte
                    </Button>
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
