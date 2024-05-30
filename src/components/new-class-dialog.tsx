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


interface AppLinkProps {
  id: number;
  title: string;
  link: string;
  isEditting?: boolean;
}

export function NewClassDialog() {
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [whatsappLinks, setWhatsappLinks] = useState<AppLinkProps[]>([])
    const [driveLinks, setDriveLinks] = useState<AppLinkProps[]>([])
    

    return (
        <Dialog>
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
                                <SelectItem value="ads">Análise e Desenvolvimento de Sistemas</SelectItem>
                                <SelectItem value="cc">Ciência da Computação</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />
                
                <AppLinkNewClass type='whatsapp' appClassLinks={whatsappLinks} classTitle={name} setAppClassLinks={setWhatsappLinks} />

                <Separator />

                <AppLinkNewClass type='drive' appClassLinks={driveLinks} classTitle={name} setAppClassLinks={setDriveLinks} />
                
                <DialogFooter>
                <Button type="submit">Enviar para aprovação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
