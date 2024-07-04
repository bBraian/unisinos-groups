import { Helmet } from "react-helmet-async";
import { Fragment, useEffect, useState } from 'react'
import { api } from '@/api/axios.tsx'
import { FeedbacksProps } from '@/@types/Feedbacks'
import { Feedbacks } from "./feedbacks";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { NoFoundSearch } from "@/components/not-found-search";


export function AdminFeedback() { 
  const [loading, setLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState<FeedbacksProps[]>([])
  console.log(feedbacks)

  useEffect(() => {
    getFeedbacks()
  }, [])

  async function getFeedbacks() {
      const { data } = await api.get('feedback')
      setFeedbacks(data.feedbacks)
      setLoading(false)
  }
  
  return (
    <>
      <Helmet title="Feedbacks" />
        <div className='flex flex-col gap-4 flex-1 p-2 max-w-4xl'>
          <h1 className="text-muted-foreground font-semibold text-2xl">
            Feedbacks ({feedbacks.length})
          </h1>
          <main className="flex flex-col gap-4">
            {loading ? (
              <LoadingSkeleton />
            ) : feedbacks.length === 0 ? (
              <NoFoundSearch />
            ) : (
              <Fragment>
                {feedbacks.map((feedback_items) => (
                  <Feedbacks key={feedback_items.id} props={feedback_items} />
                ))}
              </Fragment>
            )}
          </main>
        </div>
    </>
  )
}
