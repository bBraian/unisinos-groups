import { Helmet } from 'react-helmet-async'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { api } from '@/api/axios.tsx'
import { GroupsProps } from '@/@types/Groups.ts'
import { PrItem } from './pr-item'

export function PullRequests() {
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<GroupsProps[]>([])
  console.log(groups)

  useEffect(() => {
    getGroups()
  }, [])

  async function getGroups() {
    setTimeout(async () => {
      const { data } = await api.get('subject')
      setGroups(data.subjects)
      setLoading(false)
    }, 1000);
     
  }
  return (
    <>
      <Helmet title="Home" />
      <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Pull Requests ({groups.length})
        </h1>
        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton />
          ) : groups.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {groups.map((group) => (
                <PrItem key={group.id} props={group} />
              ))}
            </Fragment>
          )}
        </main>
      </div>
    </>
  )
}
