import { Helmet } from 'react-helmet-async'

export function Admin() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4 pb-12">
        <div className='w-full flex items-center flex-col gap-4'>
          <h1 className="text-3xl font-semibold tracking-tight">Logado como <span className="text-red-500">Admin</span></h1>
        </div>
      </div>
    </>
  )
}
