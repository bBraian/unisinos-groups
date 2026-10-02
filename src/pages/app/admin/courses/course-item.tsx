import { FormEvent, useState } from 'react'
import { Pencil, Save, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/api/axios'
import { CourseProps } from '@/@types/Course'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/utils/get-error-message'
import { ConfirmDialog } from '../componets/confirm-dialog'

interface CourseItemProps {
  course: CourseProps;
  onChanged: () => Promise<void>;
}

function formatGroupCount(count: number) {
  if(count === 0) return 'Nenhum grupo'
  return count === 1 ? '1 grupo' : `${count} grupos`
}

export function CourseItem({ course, onChanged }: CourseItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(course.name)
  const [isLoading, setIsLoading] = useState(false)
  const hasGroups = course.subjectCount > 0

  function handleStartEditing() {
    setName(course.name)
    setIsEditing(true)
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if(name.trim() == '') {
      toast.error('Preencha o nome do curso')
      return
    }

    setIsLoading(true)
    try {
      await api.put(`course/${course.id}`, { name })
      await onChanged()
      toast.success('Curso atualizado com sucesso!')
      setIsEditing(false)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao atualizar curso'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`course/${course.id}`)
      await onChanged()
      toast.success('Curso excluído com sucesso!')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao excluir curso'))
      throw error
    }
  }

  if(isEditing) {
    return (
      <form className="flex items-center gap-2 p-3 w-full border-2 rounded-md" onSubmit={handleSave}>
        <Input
          aria-label="Nome do curso"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <Button type="submit" variant="outline" size="icon" className="shrink-0" aria-label="Salvar" disabled={isLoading}>
          <Save className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" size="icon" className="shrink-0" aria-label="Cancelar" disabled={isLoading} onClick={() => setIsEditing(false)}>
          <X className="h-4 w-4" />
        </Button>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-2 p-3 w-full border-2 rounded-md">
      <div className="flex flex-col flex-1 min-w-0">
        <h2 className="font-semibold truncate">{course.name}</h2>
        <span className="text-sm text-muted-foreground">{formatGroupCount(course.subjectCount)}</span>
      </div>
      <Button variant="outline" size="icon" className="shrink-0" aria-label="Editar curso" onClick={handleStartEditing}>
        <Pencil className="h-4 w-4" />
      </Button>
      <span title={hasGroups ? 'Mova ou exclua os grupos deste curso antes de excluí-lo' : undefined}>
        <ConfirmDialog
          title="Excluir curso"
          description={<>O curso <strong>{course.name}</strong> será excluído. Essa ação não pode ser desfeita.</>}
          onConfirm={handleDelete}
          trigger={
            <Button variant="outline" size="icon" className="text-red-500" aria-label="Excluir curso" disabled={hasGroups}>
              <Trash2 className="h-4 w-4" />
            </Button>
          }
        />
      </span>
    </div>
  )
}
