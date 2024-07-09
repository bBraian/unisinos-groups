import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AppLinkNewClass } from './app-link-new-class';
import { toast } from "sonner";
import { api } from "@/api/axios";


interface AppLinkProps {
  id: number;
  title: string;
  link: string;
  isEditting?: boolean;
  type: 'whatsapp' | 'drive';
}

export function NewClassDialog() {
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [whatsappLinks, setWhatsappLinks] = useState<AppLinkProps[]>([])
    const [driveLinks, setDriveLinks] = useState<AppLinkProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);

    function reset() {
        setName('')
        setCourse('')
        setWhatsappLinks([])
        setDriveLinks([])
        setOpen(false)
    }
    
    function handleSendNewClassToApproval() {
        if(name == '') {
            toast.error('Preencha o nome do curso')
            return
        }
        if(course == '') {
            toast.error('Preencha o curso')
            return
        }

        const removeIsEditing = (links: AppLinkProps[]) => links.map(({ isEditting, id, ...rest }) => rest);
    
        const toastId = toast.loading('Enviando disciplina para aprovação')
        setIsLoading(true)
        api.post(`subject/pr`, { 
            course: parseInt(course),
            title: name,
            whatsappLinks: removeIsEditing(whatsappLinks),
            driveLinks: removeIsEditing(driveLinks)
         })
        .then(() => {
            toast.success('Disciplina enviada para aprovação')
            setIsLoading(false)
            reset()
            toast.dismiss(toastId)
        }).catch((e) => {
            if(e.response?.data?.message) {
                toast.error(e.response.data.message);
            } else {
                toast.error('Erro ao criar disciplina');
            }
            setIsLoading(false)
            toast.dismiss(toastId)
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4"  />
                    Nova cadeira
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                <div className='flex w-full items-center gap-2 mt-6'>
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='flex w-full items-center gap-2'>
                    <Label htmlFor="name" className="text-right">Curso</Label>
                    <Select value={course} onValueChange={(value) => setCourse(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Análise e Desenvolvimento de Sistemas</SelectItem>
                                <SelectItem value="2">Ciência da Computação</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />
                
                <AppLinkNewClass type='whatsapp' appClassLinks={whatsappLinks} classTitle={name} setAppClassLinks={setWhatsappLinks} />

                <Separator />

                <AppLinkNewClass type='drive' appClassLinks={driveLinks} classTitle={name} setAppClassLinks={setDriveLinks} />
                
                <DialogFooter>
                <Button type="button" onClick={handleSendNewClassToApproval} disabled={isLoading}>Enviar para aprovação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
