import { AppLinksProps } from "@/@types/appLink";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "./ui/button";
import { CircleCheckBig, CircleX, Pencil, Plus, Save, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

interface LinkProps extends AppLinksProps {
  isEditting: boolean
}

interface CustomAppLinkProps {
  type: 'whatsapp' | 'drive';
  appClassLinks: AppLinksProps[];
}

export function AppLink({type, appClassLinks} :CustomAppLinkProps) {
  const [appLink, setAppLink] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linkWithIsEditing = appClassLinks.map(link => ({
      ...link,
      isEditting: false
    }));
    
    setAppLink(linkWithIsEditing);
  }, []);

  function handleNewClassLink() {
    if(hasIdZero()) {
      return
    }
    const newLink = { id: 0, title: '', link: '', isEditting: true };
    setAppLink(prevState => ([
      ...prevState, newLink
    ]));
  }

  function handleCancelNewClassLink() {
    const updatedLinks = appLink.filter(link => link.id !== 0);
    setAppLink(updatedLinks);
  }

  function handleEditClassLink(id: number) {
    const updatedLinks = appLink.map(link => 
      link.id === id ? { ...link, isEditing: true } : link
    );
    setAppLink(updatedLinks);
  }

  function hasIdZero() {
    return appLink.some(link => link.id === 0);
  };

  return (
    <>
      <div className="flex w-full items-center gap-2">
        <div className='flex flex-col w-full gap-2'>
          {appLink.map((link) => {
            if(!link.isEditting) {
              return (
                <div className='flex w-full gap-2' key={link.id}>
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
                  <Button variant="outline" size="icon" className='h-10 w-10' onClick={() => handleEditClassLink(link.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )
            }
            return (
              <div className='flex w-full gap-2' key={link.id}>
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
                    <Button variant="outline" className='w-14' size="icon" onClick={() => handleCancelNewClassLink()}>
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
      <Button size='sm' className='flex w-min' variant='secondary' onClick={() => handleNewClassLink()}>
        {type == 'whatsapp' ? (
          <>
            <Plus className="mr-2 h-4 w-4" /> Link Whats
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" /> Link Drive
          </>
        )}
      </Button>
    </>
    
  );
};
