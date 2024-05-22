import { getServiceStatus } from '@/@fakeDB/servicesStatus'
import { Helmet } from 'react-helmet-async'
import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { Separator } from '@radix-ui/react-separator'
import { Link } from 'react-router-dom'

const servicesStatus = getServiceStatus()
console.log(servicesStatus)

const colorsStatus: any = {
  1: "bg-green-500",
  2: "bg-red-500",
  3: "bg-orange-500",
}

const timeIntervals = [
  {id: "day", name: "Dia" },
  {id: "week", name: "Semana" },
  {id: "month", name: "Mês" },
]

const services = [
  {id: 1, name: 'Service 1', dailyStatus: 98.7},
  {id: 2, name: 'Service 2', dailyStatus: 45},
  {id: 3, name: 'Service 1', dailyStatus: 100},
]



export function Home() {
  const [intervalTimeShowing, setIntervalTimeShowing] = useState("day")
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4 pb-12">
        <div className='w-full flex items-center flex-col gap-4'>
            <h1 className="text-3xl font-semibold tracking-tight">Todos os serviços <span className="text-green-500">online</span></h1>
            <div className='bg-zinc-100 dark:bg-zinc-800 py-1.5 px-3 rounded-full'>
                <span className='text-sm tracking-tight'>Última atualização: <span className='font-semibold'>18 Out</span> as <span className='font-semibold'>17:36</span></span>
            </div>
        </div>

        <div className="flex flex-col w-full pt-6">
            <div className="flex w-full justify-between pb-5 font-semibold text-lg">
                <h2 className='text-muted-foreground'>Serviços</h2>
                <div className="flex gap-2">
                  {timeIntervals.map(filter => (
                    <div key={filter.id} data-active={intervalTimeShowing == filter.id} onClick={() => setIntervalTimeShowing(filter.id)} className='text-muted-foreground hover:text-foreground data-[active=true]:text-foreground cursor-pointer'>{filter.name}</div>
                  ))}
                </div>
            </div>
            <div className='bg-zinc-100 dark:bg-zinc-800 p-5 rounded-2xl'>
              {services.map((service, index) => {
                const isLastIndex = services.length === index + 1
                return (
                  <div className='first:pt-0 last:pb-0' key={service.id}>
                    <Link to={`/service/${service.id}`}>
                        <div className='cursor-pointer hover:bg-zinc-900 rounded-lg py-3 px-5'>
                            <div className='flex justify-between pb-2'>
                                <div className='flex gap-2'>
                                <CircleCheck color="#2fc700"/> 
                                <h2 className='font-semibold'>{service.name}</h2>
                                </div>
                                <div className='text-lime-600 font-semibold'>{service.dailyStatus}%</div>
                            </div>
                            <ul className='flex w-full dark:bg-zinc-800 border-2 dark:border-zinc-600 border-white bg-white h-14 p-2 rounded-xl'>
                                {servicesStatus.map((stats) => (
                                <li 
                                    key={stats.id} 
                                    className={`flex ${colorsStatus[stats.status]} border-x-2 dark:border-x-zinc-800 border-x-white h-full w-full first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0`}
                                />
                                ))}
                            </ul>
                            <div className='flex justify-between pt-2'>
                                <div className='text-sm text-muted-foreground tracking-tigh'>Hà 60 dias </div>
                                <div className='text-sm text-muted-foreground tracking-tigh'>Hoje</div>
                            </div>
                        </div>
                    </Link>
                    {!isLastIndex && (
                        <Separator orientation="vertical" className="h-0.5 dark:bg-muted-foreground bg-gray-300 my-5 mx-5" />
                    )}
                    </div>
                )
              })}
            </div>
        </div>
      </div>
    </>
  )
}
