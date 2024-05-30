import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

export function ToggleCourses() {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cursos</SelectLabel>
          <SelectItem value="ads">Análise e Desenvolvimento de Sistemas</SelectItem>
          <SelectItem value="cc">Ciência da Computação</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
