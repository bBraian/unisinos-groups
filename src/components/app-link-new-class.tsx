import { Button } from "./ui/button";
import { Pencil, Plus, Save, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { AppLinksProps } from "@/@types/AppLink.ts";
import { toast } from "sonner";

interface LinkProps extends AppLinksProps {
  isEditting?: boolean;
  type: 'whatsapp' | 'drive';
}

interface CustomAppLinkProps {
  type: 'whatsapp' | 'drive';
  appClassLinks: LinkProps[];
  classTitle: string;
  setAppClassLinks: React.Dispatch<React.SetStateAction<LinkProps[]>>;
}

export function AppLinkNewClass({type, appClassLinks, classTitle, setAppClassLinks} :CustomAppLinkProps) {
  const [nameInput, setNameInput] = useState("");
  const [linkInput, setLinkInput] = useState("");

  function handleNewClassLink() {
    if(hasIdZero()) {
      return
    }
    const newLink = { id: 0, title: '', link: '', isEditting: true, type: type };
    setAppClassLinks(prevState => ([
      ...prevState, newLink
    ]));

    setNameInput(`${classTitle}  ${(appClassLinks.length + 1)}`);
    setLinkInput('');
  }

  function handleCancelNewClassLink(id: number) {
    let updatedLinks = appClassLinks;
    if(id === 0) {
      updatedLinks = appClassLinks.filter(link => link.id !== 0);
    } else {
      updatedLinks = appClassLinks.map(link => 
        link.id === id ? { ...link, isEditting: false } : link
      );
    }
    setAppClassLinks(updatedLinks);
    setNameInput('');
    setLinkInput('');
  }

  function handleEditClassLink(id: number) {
    const updatedLinks = appClassLinks.map(link => 
      link.id === id ? { ...link, isEditting: true } : link
    );
    setAppClassLinks(updatedLinks);

    const selectedLink = appClassLinks.find(link => link.id === id);
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

    if(id == 0) {
      let updatedLinks = appClassLinks.filter(link => link.id !== 0);
      setAppClassLinks([...updatedLinks, { id: (appClassLinks.length + 1), type: type, link: linkInput, title: nameInput, isEditting: false }])
    } else {
      let updatedLinks = appClassLinks.map(link => 
        link.id === id ? { ...link, isEditting: false, title: nameInput, link: linkInput, type: type } : link
      );
      setAppClassLinks(updatedLinks)
    }
  }

  function hasIdZero() {
    return appClassLinks.some(link => link.id === 0);
  };

  return (
    <>
      {appClassLinks.length > 0 && (
        <div className="flex w-full items-center gap-2">
          <div className='flex flex-col w-full gap-2'>
            {appClassLinks.map((link) => {
              if(!link.isEditting) {
                return (
                  <div className='flex w-full gap-2' key={link.id}>
                    <Button variant="outline" className='w-full h-10'>
                      <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                      {link.title}
                    </Button>
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
                        placeholder="Nome"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                      />
                      <Button variant="outline" className='w-14' size="icon" onClick={() => handleInsertSaveClassLink(link.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className='w-14' size="icon" onClick={() => handleCancelNewClassLink(link.id)}>
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
