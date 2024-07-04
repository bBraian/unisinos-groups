// import { useContext, useEffect } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
// import { AppContext } from '@/context/AppContext'
// import { api } from '@/api/axios'

export function ToggleCourses() {
  // const { course, setCourse } = useContext(AppContext)

  // useEffect(() => {
  //   getCourses()
  // }, [])
  
  // async function getCourses() {
  //   await api.get('course')
  //   .then((res) => {
  //     setCourse(res.data.course)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

  // console.log(course)
  
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cursos</SelectLabel>
          <SelectItem value="1">Análise e Desenvolvimento de Sistemas</SelectItem>
          {/* <SelectItem value="2">Ciência da Computação</SelectItem> */}
          {/* {course.map((item: any) => {
            <SelectItem value={item.id}>{item.name}</SelectItem>
          })} */}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
