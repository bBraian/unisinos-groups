import { Helmet } from 'react-helmet-async'
import { Fragment, useState } from 'react'
import { SearchInput } from '@/components/search-input'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { ClassItem } from '@/components/class-item'

const data = [
  {id: 1, name: '123'},
  {id: 1, name: '123'},
  {id: 1, name: '123'},
  {id: 1, name: '123'}
]


export function Home() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [intervalTimeShowing, setIntervalTimeShowing] = useState("day")
  return (
    <>
      <Helmet title="Home" />
      <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
        <h1 className="text-muted-foreground font-semibold text-2xl">
          Cadeiras disponíveis (165)
        </h1>
        <SearchInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <main className="flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton amountItems={4} />
          ) : data.length === 0 ? (
            <NoFoundSearch />
          ) : (
            <Fragment>
              {data.map((s, idx) => (
                <ClassItem key={1} name="teste" />
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
