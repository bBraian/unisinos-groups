import svgWhatsIcon from '../assets/whatsapp.svg'
import svgDriveIcon from '../assets/drive.svg'
import { Badge } from './badge';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleCheckBig, CircleX, Pencil, Plus, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


const whatsIconProps = {
    badgeStyle: 'bg-green-400',
    icon: svgWhatsIcon,
    amount: 5
}

const svgDriveProps = {
    badgeStyle: 'bg-blue-400',
    icon: svgDriveIcon,
    amount: 2
}

interface ClassItemProps {
  props: {
    id: number;
    course: number;
    title: string;
    image: string;
    whatsappLink: string;
  }
}

export function ClassItem({props} :ClassItemProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col p-3 w-full border-2 rounded-md gap-1 relative hover:bg-accent overflow-hidden">
        <div className="inline-flex justify-between">
          <div className="flex flex-row items-center gap-1">
            <img src={props.image} className="w-16 h-16 rounded-sm mr-2.5" alt="" />
            <div className='flex flex-col gap-3.5'>
              <h2 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500 leading-4">
                {props.title}
              </h2>
              <div className='flex gap-2'>
                <Badge props={whatsIconProps} />
                <Badge props={svgDriveProps} />
              </div>
            </div>
            
          </div>
        </div>
        <div className='absolute w-2 bg-green-500 top-0 right-0 bottom-0 m-2 rounded-[2px]'></div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className='flex flex-row items-center'>
          <img src={props.image} className="w-6 h-6 rounded-sm mr-2.5 mt-[6px]" alt="" />
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
          <div className="flex w-full items-center gap-2">
            
            <div className='flex flex-col w-full gap-2'>
              <div className='flex w-full gap-2'>
                <ContextMenu>
                  <ContextMenuTrigger className='w-full'>
                    <Button variant="outline" className='w-full'>
                      <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                      Grupo Desenvolvimento Web 1
                    </Button>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem className='gap-2 text-green-500'><CircleCheckBig className='w-5 h-5' /> Funcionando</ContextMenuItem>
                    <ContextMenuItem className='gap-2 text-red-500'><CircleX /> Não funcionando</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className='flex w-full gap-2'>
                <ContextMenu>
                  <ContextMenuTrigger className='w-full'>
                    <Button variant="outline" className='w-full'>
                      <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                      Grupo Desenvolvimento Web 1
                    </Button>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem className='gap-2 text-green-500'><CircleCheckBig className='w-5 h-5' /> Funcionando</ContextMenuItem>
                    <ContextMenuItem className='gap-2 text-red-500'><CircleX /> Não funcionando</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <div className='flex w-full gap-2'>
                <div className="flex flex-col p-3 w-full border-2 rounded-md overflow-hidden items-end gap-2">
                  <div className='flex w-full items-center gap-2'>
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input
                      id="name"
                      defaultValue="Grupo 1"
                    />
                    <Button variant="outline" size="icon">
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className='flex w-full items-center gap-2'>
                    <Label htmlFor="link" className="text-right">Link</Label>
                    <Input
                      id="link"
                      defaultValue="https://chat.whatsapp.com/E1QRZ48cQ1U62ThrllpmF4"
                    />
                  </div>
                  
                  
                </div>
                
              </div>
              
            </div>
            
            
            
          </div>
          <Button size='sm' className='flex w-min' variant='secondary'>
            <Plus className="mr-2 h-4 w-4" /> Link Whats
          </Button>
          <Separator />
          <div className="flex w-full items-center gap-2">
            {/* <Input
              id="name"
              defaultValue="Pedro Duarte"
            /> */}
            <Button variant="outline" className='w-full'>
              Drive semestre 1
            </Button>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <Button size='sm' className='flex w-min' variant='secondary'>
            <Plus className="mr-2 h-4 w-4" /> Link Drive
          </Button>
        <DialogFooter>
          <Button type="submit">Enviar para aprovação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
