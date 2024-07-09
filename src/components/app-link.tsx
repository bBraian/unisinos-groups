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
import { AppLinksProps } from "@/@types/AppLink.ts";
import { api } from "@/api/axios";
import { toast } from "sonner";

import svgWhatsIcon from '../assets/whatsapp.svg'
import svgDriveIcon from '../assets/drive.svg'

interface LinkProps extends AppLinksProps {
  isEditting: boolean
}

interface CustomAppLinkProps {
  type: 'whatsapp' | 'drive';
  appClassLinks: AppLinksProps[];
  classTitle: string;
  classId: number;
}

export function AppLink({type, appClassLinks, classTitle, classId} :CustomAppLinkProps) {
  const [appLink, setAppLink] = useState<LinkProps[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)

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

    setNameInput(`${classTitle}  ${(appClassLinks.length + 1)}`);
    setLinkInput('');
  }

  function handleCancelNewClassLink(id: number) {
    let updatedLinks = appLink;
    if(id === 0) {
      updatedLinks = appLink.filter(link => link.id !== 0);
    } else {
      updatedLinks = appLink.map(link => 
        link.id === id ? { ...link, isEditting: false } : link
      );
    }
    setAppLink(updatedLinks);
    setNameInput('');
    setLinkInput('');
  }

  function handleEditClassLink(id: number) {
    const updatedLinks = appLink.map(link => 
      link.id === id ? { ...link, isEditting: true } : link
    );
    setAppLink(updatedLinks);

    const selectedLink = appLink.find(link => link.id === id);
    if (selectedLink) {
      setNameInput(selectedLink.title);
      setLinkInput(selectedLink.link);
    }
  }

  function handleInsertSaveClassLink(id: number) {
    if(nameInput == '') {
      toast.error('Preencha o nome do link')
      return
    }
    if(linkInput == '') {
      toast.error('Preencha o link')
      return
    }

    const toastId = toast.loading('Enviando link para aprovação')
    setIsLoading(true)
    api.post(`link/pr`, {
      subjectId: classId,
      linkId: id > 0 ? id : null,
      title: nameInput,
      link: linkInput,
      type
    })
    .then((response) => {
      toast.success('Link enviado para aprovação')
      setIsLoading(false)
      handleCancelNewClassLink(id)
      toast.dismiss(toastId)
    }).catch((e) => {
      if(e.response?.data?.message) {
        toast.error(e.response.data.message);
      } else {
          toast.error('Erro ao enviar link para aprovação');
      }
      setIsLoading(false)
      toast.dismiss(toastId)
    })
  }

  function hasIdZero() {
    return appLink.some(link => link.id === 0);
  };

  return (
    <>
      {appLink.length > 0 && (
        <div className="flex w-full items-center gap-2">
          <div className='flex flex-col w-full gap-2'>
            {appLink.map((link) => {
              if(!link.isEditting) {
                return (
                  <div className='flex w-full gap-2' key={link.id}>
                    <ContextMenu>
                      <ContextMenuTrigger className='w-full'>
                        <a href={link.link} target="_blank">
                          <Button variant="outline" className='w-full h-10'>
                              <div className={`relative w-5 h-5 rounded-md flex justify-center items-center mr-2 ${type == 'whatsapp' ? 'bg-green-400' : 'bg-blue-400'}`}>
                                <img src={type == 'whatsapp' ? svgWhatsIcon : svgDriveIcon} className="w-3.5 h-3.5" alt="" />
                              </div>
                              {link.title}
                          </Button>
                        </a>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem className='gap-2 text-green-500'><CircleCheckBig className='w-5 h-5' /> Funcionando</ContextMenuItem>
                        <ContextMenuItem className='gap-2 text-red-500'><CircleX /> Não funcionando</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                    <Button disabled={isLoading} variant="outline" size="icon" className='h-10 w-10' onClick={() => handleEditClassLink(link.id)}>
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
                        placeholder="Nome"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                      />
                      <Button disabled={isLoading} variant="outline" className='w-14' size="icon" onClick={() => handleInsertSaveClassLink(link.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button disabled={isLoading} variant="outline" className='w-14' size="icon" onClick={() => handleCancelNewClassLink(link.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className='flex w-full items-center gap-2'>
                      <Label htmlFor="link" className="text-right">Link</Label>
                      <Input
                        placeholder="Link"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                      />
                    </div>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
      )}
      
      <Button disabled={isLoading} size='sm' className='flex w-min' variant='secondary' onClick={() => handleNewClassLink()}>
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
