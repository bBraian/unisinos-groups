import { Helmet } from 'react-helmet-async'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { api } from '@/api/axios.tsx'
import { PrItem } from './pr-item'
import { PullRequestsProps } from '@/@types/PullRequests'

export function PullRequests() {
  const [loading, setLoading] = useState(true)
  const [pullRequests, setPullRequests] = useState<PullRequestsProps[]>([])
  console.log(pullRequests)

  useEffect(() => {
    getPullRequests()
  }, [])

  async function getPullRequests() {
    setTimeout(async () => {
      const { data } = await api.get('pull-request')
      setPullRequests(data)
      setLoading(false)
    }, 1000);
     
  }
  return (
    <>
      <Helmet title="Home" />
      <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Pull Requests ({pullRequests.length})
        </h1>
        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton />
          ) : pullRequests.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {pullRequests.map((group) => (
                <PrItem key={group.id} props={group} setPullRequests={setPullRequests} />
              ))}
            </Fragment>
          )}
        </main>
      </div>
    </>
  )
}
