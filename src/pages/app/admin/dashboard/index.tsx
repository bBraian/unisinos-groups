import { Helmet } from 'react-helmet-async'
import { MetricsCard } from './metrics-card'
import { Chart } from './chart'
import { useEffect, useState } from 'react'
import { api } from '@/api/axios'
import { MoonLoader } from 'react-spinners'

export function Admin() {
  const [loading, setLoading] = useState(true)
  const [dashboardMetrics, setDashboardMetrics] = useState<any>({})

  useEffect(() => {
    getDashboardMetrics()
  }, [])

  async function getDashboardMetrics() {
    const { data } = await api.get('dashborad/principal')
    setDashboardMetrics(data.dashboard)
    setLoading(false)
  }

  if(loading) {
    return (
      <MoonLoader color="#FFF" speedMultiplier={0.6} />
    )
  }
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-12 gap-4">
          <div className='col-span-2 flex flex-col gap-4'>
            <MetricsCard name='Disciplinas/Pr' value={`${dashboardMetrics.subjectCount}/${dashboardMetrics.pullRequest}`} />
            <MetricsCard name='Feedbacks' value={dashboardMetrics.feedbackCount} />
            {/* <MetricsCard name='Erros' value={dashboardMetrics.errorsCount} /> */}
            <MetricsCard name='Erros' value="0" />
          </div>
          <div className='col-span-10 h-full'>
            <Chart />
          </div>
        </div>

      </div>
    </>
  )
}
