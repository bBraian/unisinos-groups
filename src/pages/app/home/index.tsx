import { Helmet } from 'react-helmet-async'
import { Fragment, useEffect, useState } from 'react'
import { SearchInput } from '@/components/search-input'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { ClassItem } from '@/components/class-item'
import { api } from '@/api/axios.tsx'
import { GroupsProps } from '@/@types/Groups.ts'
import { Link } from 'react-router-dom'

export function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<GroupsProps[]>([])
  const [filteredGroups, setFilteredGroups] = useState<GroupsProps[]>([])
  console.log(groups)

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    if(searchValue.length > 0) {
        setFilteredGroups(groups.filter(group => group.title.toLowerCase().includes(searchValue.toLowerCase())));
    } else {
      setFilteredGroups(groups)
    }
}, [searchValue])

  async function getGroups() {
    const { data } = await api.get('subject')
    setGroups(data.subjects)
    setFilteredGroups(data.subjects)
    setLoading(false)
  }
  return (
    <>
      <Helmet title="Home" />
      <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Cadeiras disponíveis ({filteredGroups.length})
        </h1>
        <SearchInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton />
          ) : groups.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {filteredGroups.length === 0 ? ( <NoFoundSearch /> ) : (
                <Fragment>
                  {filteredGroups.map((group) => (
                    <ClassItem key={group.id} props={group} />
                  ))}
                  <div className='flex w-full justify-between'>
                    <p className="text-muted-foreground font-semibold">
                      Não há mais registros
                    </p>
                    <Link to="/feedback" className='text-muted-foreground hover:text-white font-semibold'>Deixar um feedback</Link>
                  </div>
                  
                </Fragment>
              )}
            </Fragment>
          )}
        </main>
      </div>
    </>
  )
}
