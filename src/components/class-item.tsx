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
import { CircleCheckBig, CircleX, Divide, History, Pencil, Plus, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';


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

interface AppLinkProps {
  id: number;
  title: string;
  link: string;
  isEditing?: boolean;
}

interface ClassItemProps {
  props: {
    id: number;
    course: number;
    title: string;
    image: string;
    whatsappLinks: AppLinkProps[];
    driveLinks: AppLinkProps[];
  }
}

export function ClassItem({props: { image, title, whatsappLinks, driveLinks }} :ClassItemProps) {
  const [whatsappClassLinks, setWhatsappClassLinks] = useState<AppLinkProps[]>([]);
  const [driveClassLinks, setDriveClassLinks] = useState<AppLinkProps[]>([]);

  useEffect(() => {
    const whatsWithIsEditing = whatsappLinks.map(link => ({
      ...link,
      isEditing: false
    }));
    const driveWithIsEditing = driveLinks.map(link => ({
      ...link,
      isEditing: false
    }));
    setWhatsappClassLinks(whatsWithIsEditing);
    setDriveClassLinks(driveWithIsEditing);
  }, []);

  console.log(whatsappClassLinks)

  function handleNewClassLink(type: string) {
    if(hasIdZero()) {
      return
    }
    const newLink = { id: 0, title: '', link: '', isEditing: true };
    if(type == 'whatsapp') {
      setWhatsappClassLinks(prevState => ([
        ...prevState, newLink
      ]));
    } else {
      setDriveClassLinks(prevState => ([
        ...prevState, newLink
      ]));
    }
  }

  function handleCancelNewClassLink(type: string) {
    if(type == 'whatsapp') {
      const updatedLinks = whatsappClassLinks.filter(link => link.id !== 0);
      setWhatsappClassLinks(updatedLinks);
    } else {
      const updatedLinks = driveClassLinks.filter(link => link.id !== 0);
      setDriveClassLinks(updatedLinks);
    }
  }

  function handleEditClassLink(type: string, id: number) {
    if(type == 'whatsapp') {
      const updatedLinks = whatsappClassLinks.map(link => 
        link.id === id ? { ...link, isEditing: true } : link
      );
      setWhatsappClassLinks(updatedLinks);
    } else {
      const updatedLinks = driveClassLinks.map(link => 
        link.id === id ? { ...link, isEditing: true } : link
      );
      setDriveClassLinks(updatedLinks);
    }
    
  }

  function hasIdZero() {
    const whatsappHasIdZero = whatsappClassLinks.some(link => link.id === 0);
    const driveHasIdZero = driveClassLinks.some(link => link.id === 0);

    return whatsappHasIdZero || driveHasIdZero;
  };

  return (
    <Dialog>
      <DialogTrigger className="relative flex flex-col p-3 w-full border-2 rounded-md gap-1 hover:bg-accent">
        <div className="absolute top-0 left-0 bg-orange-400 text-white text-[11px] font-bold flex items-center justify-center rounded-full w-5 h-5 transform -translate-x-1/2 -translate-y-1/2">
          <History size={15} strokeWidth={3} />
        </div>
        <div className="inline-flex justify-between">
          <div className="flex flex-row items-center gap-1">
            {image ? (
              <img src={image} className="w-16 h-16 rounded-sm mr-2.5" alt="" />
            ) : (
              <div className="w-16 h-16 rounded-sm mr-2.5 bg-muted"></div>
            )}
            <div className='flex flex-col gap-3.5'>
              <h2 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500 leading-4">
                {title}
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
          {image ? (
            <img src={image} className="w-6 h-6 rounded-sm mr-2.5 mt-[6px]" alt="" />
          ) : (
            <div className="w-6 h-6 rounded-sm mr-2.5 mt-[6px] bg-muted"></div>
          )}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          <div className="flex w-full items-center gap-2">
            
            <div className='flex flex-col w-full gap-2'>
              {whatsappClassLinks.map((link) => {
                if(!link.isEditing) {
                  return (
                    <div className='flex w-full gap-2'>
                      <ContextMenu>
                        <ContextMenuTrigger className='w-full'>
                          <Button variant="outline" className='w-full h-10'>
                            <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                            {link.title}
                          </Button>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem className='gap-2 text-green-500'><CircleCheckBig className='w-5 h-5' /> Funcionando</ContextMenuItem>
                          <ContextMenuItem className='gap-2 text-red-500'><CircleX /> Não funcionando</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                      <Button variant="outline" size="icon" className='h-10 w-10' onClick={() => handleEditClassLink('whatsapp', link.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                }
                return (
                  <div className='flex w-full gap-2'>
                    <div className="flex flex-col p-3 w-full border-2 rounded-md overflow-hidden items-end gap-2">
                      <div className='flex w-full items-center gap-2'>
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input
                          id="name"
                          defaultValue="Grupo 1"
                        />
                        <Button variant="outline" className='w-14' size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className='w-14' size="icon" onClick={() => handleCancelNewClassLink('whatsapp')}>
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
                )
              })}
            </div>
          </div>
          <Button size='sm' className='flex w-min' variant='secondary' onClick={() => handleNewClassLink('whatsapp')}>
            <Plus className="mr-2 h-4 w-4" /> Link Whats
          </Button>

          <Separator />

          <div className="flex w-full items-center gap-2">
            
            <div className='flex flex-col w-full gap-2'>
              {driveClassLinks.map((link) => {
                if(!link.isEditing) {
                  return (
                    <div className='flex w-full gap-2'>
                      <ContextMenu>
                        <ContextMenuTrigger className='w-full'>
                          <Button variant="outline" className='w-full h-10'>
                            <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                            Drive 1
                          </Button>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                          <ContextMenuItem className='gap-2 text-green-500'><CircleCheckBig className='w-5 h-5' /> Funcionando</ContextMenuItem>
                          <ContextMenuItem className='gap-2 text-red-500'><CircleX /> Não funcionando</ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                      <Button variant="outline" size="icon" className='h-10 w-10'>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                }
                return (
                  <div className='flex w-full gap-2'>
                    <div className="flex flex-col p-3 w-full border-2 rounded-md overflow-hidden items-end gap-2">
                      <div className='flex w-full items-center gap-2'>
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input
                          id="name"
                          defaultValue="Grupo 1"
                        />
                        <Button variant="outline" className='w-14' size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className='w-14' size="icon" onClick={() => handleCancelNewClassLink('')}>
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
                )
              })}
            </div>
          </div>
          <Button size='sm' className='flex w-min' variant='secondary' onClick={() => handleNewClassLink('drive')}>
            <Plus className="mr-2 h-4 w-4" /> Link Drive
          </Button>
        <DialogFooter>
          <Button type="submit">Enviar para aprovação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
