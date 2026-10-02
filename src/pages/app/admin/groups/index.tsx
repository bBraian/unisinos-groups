import { Helmet } from 'react-helmet-async'
import { useContext, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/api/axios'
import { GroupsProps } from '@/@types/Groups'
import { ALL_COURSES, AppContext } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SearchInput } from '@/components/search-input'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { getErrorMessage } from '@/utils/get-error-message'
import { GroupFormDialog } from './group-form-dialog'
import { GroupItem } from './group-item'

export function AdminGroups() {
  const { courses, loadCourses } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<GroupsProps[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [courseFilter, setCourseFilter] = useState(ALL_COURSES)

  useEffect(() => {
    getGroups()
  }, [])

  async function getGroups() {
    try {
      const { data } = await api.get('subject')
      setGroups(data.subjects)
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao carregar grupos'))
    } finally {
      setLoading(false)
    }
  }

  function handleGroupSaved(savedGroup: GroupsProps) {
    setGroups((prevState) => {
      const alreadyListed = prevState.some(group => group.id === savedGroup.id)
      return alreadyListed
        ? prevState.map(group => group.id === savedGroup.id ? savedGroup : group)
        : [...prevState, savedGroup]
    })
    // Atualiza a quantidade de grupos por curso
    loadCourses()
  }

  function handleGroupDeleted(groupId: number) {
    setGroups((prevState) => prevState.filter(group => group.id !== groupId))
    loadCourses()
  }

  const search = searchValue.toLowerCase()
  const filteredGroups = groups
    .filter(group =>
      (courseFilter === ALL_COURSES || group.courseId === Number(courseFilter))
      && group.title.toLowerCase().includes(search)
    )
    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))

  return (
    <>
      <Helmet title="Grupos" />
      <div className='flex flex-col gap-4 flex-1 min-w-0 p-2 max-w-4xl'>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-muted-foreground font-semibold text-2xl">
            Grupos ({filteredGroups.length})
          </h1>
          <GroupFormDialog
            defaultCourse={courseFilter === ALL_COURSES ? '' : courseFilter}
            onSaved={handleGroupSaved}
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo grupo
              </Button>
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <SearchInput
            className="flex-1"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="h-12 sm:w-[240px]" aria-label="Filtrar por curso">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={ALL_COURSES}>Todos os cursos</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={String(course.id)}>{course.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton />
          ) : filteredGroups.length === 0 ? (
            <NoFoundSearch />
          ) : (
            filteredGroups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                courseName={courses.find(course => course.id === group.courseId)?.name}
                onSaved={handleGroupSaved}
                onDeleted={handleGroupDeleted}
              />
            ))
          )}
        </main>
      </div>
    </>
  )
}
