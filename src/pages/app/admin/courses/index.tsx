import { Helmet } from 'react-helmet-async'
import { FormEvent, useContext, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/api/axios'
import { AppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { getErrorMessage } from '@/utils/get-error-message'
import { CourseItem } from './course-item'

export function AdminCourses() {
  const { courses, loadCourses, loading } = useContext(AppContext)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateCourse(e: FormEvent) {
    e.preventDefault()
    if(name.trim() == '') {
      toast.error('Preencha o nome do curso')
      return
    }

    setIsLoading(true)
    try {
      await api.post('course', { name })
      await loadCourses()
      toast.success('Curso cadastrado com sucesso!')
      setName('')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao cadastrar curso'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet title="Cursos" />
      <div className='flex flex-col gap-4 flex-1 min-w-0 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Cursos ({courses.length})
        </h1>
        <form className="flex gap-2" onSubmit={handleCreateCourse}>
          <Input
            aria-label="Nome do novo curso"
            placeholder="Nome do novo curso"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </form>
        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton />
          ) : courses.length === 0 ? (
            <NoFoundSearch />
          ) : (
            courses.map((course) => (
              <CourseItem key={course.id} course={course} onChanged={loadCourses} />
            ))
          )}
        </main>
      </div>
    </>
  )
}
