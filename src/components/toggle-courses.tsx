import { useContext } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { ALL_COURSES, AppContext } from '@/context/AppContext'

export function ToggleCourses() {
  const { courses, selectedCourse, setSelectedCourse } = useContext(AppContext)

  return (
    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cursos</SelectLabel>
          <SelectItem value={ALL_COURSES}>Todos os cursos</SelectItem>
          {courses.map((course) => (
            <SelectItem key={course.id} value={String(course.id)}>{course.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
