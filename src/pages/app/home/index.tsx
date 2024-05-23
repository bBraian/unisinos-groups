import { Helmet } from 'react-helmet-async'
import { Fragment, useEffect, useState } from 'react'
import { SearchInput } from '@/components/search-input'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { ClassItem } from '@/components/class-item'
import { grupos } from '../../../@fakeDB/groups.ts'

export function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [searchValue])
  return (
    <>
      <Helmet title="Home" />
      <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Cadeiras disponíveis ({grupos.length})
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
          ) : grupos.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {grupos.map((group) => (
                <ClassItem key={group.id} props={group} />
              ))}
              {/* <p className="text-muted-foreground font-semibold">
                Não há mais registros
              </p> */}
            </Fragment>
          )}
        </main>
      </div>
    </>
  )
}
