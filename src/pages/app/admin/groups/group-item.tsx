import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import svgWhatsIcon from '../../../../assets/whatsapp.svg'
import svgDriveIcon from '../../../../assets/drive.svg'
import { api } from '@/api/axios'
import { GroupsProps } from '@/@types/Groups'
import { Badge } from '@/components/badge'
import { Button } from '@/components/ui/button'
import { getErrorMessage } from '@/utils/get-error-message'
import { getInitials } from '@/utils/get-initials'
import { ConfirmDialog } from '../componets/confirm-dialog'
import { GroupFormDialog } from './group-form-dialog'

const whatsIconProps = {
  badgeStyle: 'bg-green-400',
  icon: svgWhatsIcon,
}

const svgDriveProps = {
  badgeStyle: 'bg-blue-400',
  icon: svgDriveIcon,
}

interface GroupItemProps {
  group: GroupsProps;
  courseName?: string;
  onSaved: (group: GroupsProps) => void;
  onDeleted: (groupId: number) => void;
}

export function GroupItem({ group, courseName, onSaved, onDeleted }: GroupItemProps) {
  const { id, title, image, whatsappLinks, driveLinks } = group

  async function handleDelete() {
    try {
      await api.delete(`subject/${id}`)
      toast.success('Grupo excluído com sucesso!')
      onDeleted(id)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao excluir grupo'))
      throw error
    }
  }

  return (
    <div className="flex items-center gap-3 p-3 w-full border-2 rounded-md">
      {image ? (
        <img src={image} className="w-16 h-16 shrink-0 rounded-sm object-cover" alt="" />
      ) : (
        <div className="w-16 h-16 shrink-0 rounded-sm bg-muted flex justify-center items-center font-bold text-lg tracking-wider">
          {getInitials(title)}
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <h2 className="font-semibold text-lg leading-5 truncate">{title}</h2>
        <span className="text-sm text-muted-foreground truncate">{courseName ?? 'Curso não encontrado'}</span>
        <div className="flex gap-2 mt-3">
          {whatsappLinks.length > 0 && (
            <Badge props={whatsIconProps} amount={whatsappLinks.length} />
          )}
          {driveLinks.length > 0 && (
            <Badge props={svgDriveProps} amount={driveLinks.length} />
          )}
          {whatsappLinks.length + driveLinks.length === 0 && (
            <span className="text-xs text-muted-foreground">Sem links</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <GroupFormDialog
          group={group}
          onSaved={onSaved}
          trigger={
            <Button variant="outline" size="icon" aria-label="Editar grupo">
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />
        <ConfirmDialog
          title="Excluir grupo"
          description={<>O grupo <strong>{title}</strong> e todos os seus links serão excluídos. Essa ação não pode ser desfeita.</>}
          onConfirm={handleDelete}
          trigger={
            <Button variant="outline" size="icon" className="text-red-500" aria-label="Excluir grupo">
              <Trash2 className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
