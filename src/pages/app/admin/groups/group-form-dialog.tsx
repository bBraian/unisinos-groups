import { ReactNode, useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/api/axios'
import { AppLinksProps } from '@/@types/AppLink'
import { GroupsProps } from '@/@types/Groups'
import { AppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getErrorMessage } from '@/utils/get-error-message'
import { getInitials } from '@/utils/get-initials'
import { GroupLinksField } from './group-links-field'

const linkForm = z.object({
  linkId: z.number().optional(),
  title: z.string().trim().min(1, 'Informe o nome do link'),
  link: z.string().trim().url('Informe um link válido'),
})

const groupForm = z.object({
  title: z.string().trim().min(1, 'Informe o nome do grupo'),
  course: z.string().min(1, 'Selecione o curso'),
  image: z.string().trim().refine(
    (value) => value === '' || z.string().url().safeParse(value).success,
    'Informe uma URL válida'
  ),
  whatsappLinks: z.array(linkForm),
  driveLinks: z.array(linkForm),
})

export type GroupForm = z.infer<typeof groupForm>

function toLinkForm({ id, title, link }: AppLinksProps) {
  return { linkId: id, title, link }
}

function toLinkBody({ linkId, title, link }: GroupForm['whatsappLinks'][number]) {
  return { id: linkId, title, link }
}

function toFormValues(group?: GroupsProps, defaultCourse = ''): GroupForm {
  return {
    title: group?.title ?? '',
    course: group ? String(group.courseId) : defaultCourse,
    image: group?.image ?? '',
    whatsappLinks: group?.whatsappLinks.map(toLinkForm) ?? [],
    driveLinks: group?.driveLinks.map(toLinkForm) ?? [],
  }
}

interface GroupFormDialogProps {
  group?: GroupsProps;
  defaultCourse?: string;
  trigger: ReactNode;
  onSaved: (group: GroupsProps) => void;
}

export function GroupFormDialog({ group, defaultCourse, trigger, onSaved }: GroupFormDialogProps) {
  const { courses } = useContext(AppContext)
  const [open, setOpen] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GroupForm>({
    resolver: zodResolver(groupForm),
    defaultValues: toFormValues(group, defaultCourse),
  })

  useEffect(() => {
    if(open) {
      reset(toFormValues(group, defaultCourse))
    }
  }, [open])

  const title = watch('title')
  const image = watch('image')

  async function handleSaveGroup(data: GroupForm) {
    const body = {
      course: Number(data.course),
      title: data.title,
      image: data.image,
      whatsappLinks: data.whatsappLinks.map(toLinkBody),
      driveLinks: data.driveLinks.map(toLinkBody),
    }

    try {
      const { data: response } = group
        ? await api.put(`subject/${group.id}`, body)
        : await api.post('subject', body)

      toast.success(group ? 'Grupo atualizado com sucesso!' : 'Grupo cadastrado com sucesso!')
      onSaved(response.subject)
      setOpen(false)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao salvar grupo'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{group ? 'Editar grupo' : 'Novo grupo'}</DialogTitle>
          <DialogDescription>
            {group
              ? 'As alterações são publicadas na hora, sem passar por aprovação.'
              : 'O grupo é publicado na hora, sem passar por aprovação.'}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSaveGroup)}>
          <div className="space-y-2">
            <Label htmlFor="group-title">Nome</Label>
            <Input id="group-title" placeholder="Ex.: Programação I" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-course">Curso</Label>
            <Controller
              control={control}
              name="course"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="group-course">
                    <SelectValue placeholder="Selecione o curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={String(course.id)}>{course.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {courses.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum curso cadastrado. <Link to="/admin/courses" className="underline">Cadastre um curso</Link> antes de criar grupos.
              </p>
            )}
            {errors.course && (
              <p className="text-sm text-red-500">{errors.course.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-image">Imagem (URL, opcional)</Label>
            <div className="flex items-center gap-2">
              {image ? (
                // key remonta a imagem ao trocar a URL, para que um erro anterior não a mantenha escondida
                <img
                  key={image}
                  src={image}
                  className="w-9 h-9 shrink-0 rounded-sm object-cover"
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                  alt=""
                />
              ) : (
                <div className="w-9 h-9 shrink-0 rounded-sm bg-muted flex justify-center items-center font-bold text-xs tracking-wider">
                  {title.trim() ? getInitials(title.trim()) : ''}
                </div>
              )}
              <Input id="group-image" placeholder="https://i.imgur.com/..." {...register('image')} />
            </div>
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <Separator />

          <GroupLinksField type="whatsapp" control={control} register={register} errors={errors.whatsappLinks} />

          <Separator />

          <GroupLinksField type="drive" control={control} register={register} errors={errors.driveLinks} />

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {group ? 'Salvar alterações' : 'Cadastrar grupo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
