import { Helmet } from 'react-helmet-async'
import { MetricsCard } from './metrics-card'
import { Chart } from './chart'

export function Admin() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-12 gap-4">
          <div className='col-span-2 flex flex-col gap-4'>
            <MetricsCard name='Disciplinas/Pr' value="52/12" />
            <MetricsCard name='Feedbacks' value="8" />
            <MetricsCard name='Erros' value="4" />
          </div>
          <div className='col-span-10 h-full'>
            <Chart />
          </div>
        </div>

      </div>
    </>
  )
}
