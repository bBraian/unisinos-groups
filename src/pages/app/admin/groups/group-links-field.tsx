import { Control, FieldErrors, UseFormRegister, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'

import svgWhatsIcon from '../../../../assets/whatsapp.svg'
import svgDriveIcon from '../../../../assets/drive.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { GroupForm } from './group-form-dialog'

const linkTypeProps = {
  whatsapp: {
    name: 'whatsappLinks',
    label: 'Links do WhatsApp',
    placeholder: 'https://chat.whatsapp.com/...',
    badgeStyle: 'bg-green-400',
    icon: svgWhatsIcon,
  },
  drive: {
    name: 'driveLinks',
    label: 'Links do Drive',
    placeholder: 'https://drive.google.com/...',
    badgeStyle: 'bg-blue-400',
    icon: svgDriveIcon,
  },
} as const

interface GroupLinksFieldProps {
  type: 'whatsapp' | 'drive';
  control: Control<GroupForm>;
  register: UseFormRegister<GroupForm>;
  errors?: FieldErrors<GroupForm>['whatsappLinks'];
}

export function GroupLinksField({ type, control, register, errors }: GroupLinksFieldProps) {
  const { name, label, placeholder, badgeStyle, icon } = linkTypeProps[type]
  const { fields, append, remove } = useFieldArray({ control, name })

  function handleAddLink() {
    append(
      { title: `Link ${fields.length + 1}`, link: '' },
      { focusName: `${name}.${fields.length}.link` }
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Button type="button" size="sm" variant="secondary" onClick={handleAddLink}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhum link cadastrado.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="relative flex flex-col gap-2 p-3 w-full border-2 rounded-md">
          <div className={`absolute top-1 left-1 w-5 h-5 rounded-md flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 ${badgeStyle}`}>
            <img src={icon} className="w-3.5 h-3.5" alt="" />
          </div>
          <div className="flex items-center gap-2">
            <Input aria-label="Nome do link" placeholder="Nome" {...register(`${name}.${index}.title`)} />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0 text-red-500"
              aria-label="Remover link"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input aria-label="Link" placeholder={placeholder} {...register(`${name}.${index}.link`)} />
          {errors?.[index]?.title && (
            <p className="text-sm text-red-500">{errors[index]?.title?.message}</p>
          )}
          {errors?.[index]?.link && (
            <p className="text-sm text-red-500">{errors[index]?.link?.message}</p>
          )}
        </div>
      ))}
    </div>
  )
}
