import { Helmet } from 'react-helmet-async'
import { Fragment, useEffect, useState } from 'react'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { NoFoundSearch } from '@/components/not-found-search'
import { api } from '@/api/axios.tsx'
import { PrItem } from './pr-item'
import { PullRequestsProps } from '@/@types/PullRequests'

export function PullRequests() {
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState<PullRequestsProps[]>([])
  console.log(groups)

  useEffect(() => {
    getGroups()
  }, [])

  async function getGroups() {
    setTimeout(async () => {
      const { data } = await api.get('pull-request')
      // const data: any  = [
      //   {
      //       "id": 2,
      //       "title": "Desenvolvimento Web",
      //       "image": "https://i.imgur.com/sosgbXb.png",
      //       "courseId": 1,
      //       "createdAt": "2024-06-12T01:08:55.821Z",
      //       "updatedAt": "2024-06-12T01:08:55.821Z",
      //       "links": false,
      //       "whatsappLinks": [
      //           {
      //               "id": 1,
      //               "title": "Link 1",
      //               "link": "https://chat.whatsapp.com/E1QRZ48cQ1U62ThrllpmF4",
      //               "type": "whatsapp",
      //               "subjectId": 2,
      //               "createdAt": "2024-06-12T01:08:55.842Z",
      //               "updatedAt": "2024-06-12T01:08:55.842Z"
      //           }
      //       ],
      //       "driveLinks": []
      //   },
      //   {
      //       "id": 3,
      //       "title": "Programação FrontEnd",
      //       "image": "https://i.imgur.com/6QCpgi3.png",
      //       "courseId": 1,
      //       "createdAt": "2024-06-16T18:52:01.531Z",
      //       "updatedAt": "2024-06-16T18:52:01.531Z",
      //       "links": false,
      //       "whatsappLinks": [
      //           {
      //               "id": 7,
      //               "title": "Link 1",
      //               "link": "https://chat.whatsapp.com/LNsCS8pf5TF3d56CR6nOBl",
      //               "type": "whatsapp",
      //               "subjectId": 3,
      //               "createdAt": "2024-06-16T18:52:01.598Z",
      //               "updatedAt": "2024-06-16T18:52:01.598Z"
      //           }
      //       ],
      //       "driveLinks": []
      //   },
      //   {
      //       "id": 4,
      //       "title": "Arquitetura de Software",
      //       "image": "https://i.imgur.com/xGuwLwv.png",
      //       "courseId": 1,
      //       "createdAt": "2024-06-16T18:53:44.922Z",
      //       "updatedAt": "2024-06-16T18:53:44.922Z",
      //       "links": false,
      //       "whatsappLinks": [
      //           {
      //               "id": 8,
      //               "title": "Link 1",
      //               "link": "https://chat.whatsapp.com/HvVqtjvVcYy14EvwbZs9ns",
      //               "type": "whatsapp",
      //               "subjectId": 4,
      //               "createdAt": "2024-06-16T18:53:44.931Z",
      //               "updatedAt": "2024-06-16T18:53:44.931Z"
      //           }
      //       ],
      //       "driveLinks": [
      //           {
      //               "id": 47,
      //               "title": "Link 1",
      //               "link": "https://docs.google.com/document/d/1bqy7ftMzVQlOa8frGKM3clFCC3pKUF5Ygv8EIVZ9XkE/edit",
      //               "type": "drive",
      //               "subjectId": 4,
      //               "createdAt": "2024-06-12T01:08:55.842Z",
      //               "updatedAt": "2024-06-12T01:08:55.842Z"
      //           }
      //       ]
      //   },
      //   {
      //       "id": 5,
      //       "title": "Segurança da Informação",
      //       "image": "https://i.imgur.com/WGYShLx.png",
      //       "courseId": 1,
      //       "createdAt": "2024-06-16T19:12:42.459Z",
      //       "updatedAt": "2024-06-16T19:12:42.459Z",
      //       "links": false,
      //       "whatsappLinks": [
      //           {
      //               "id": 9,
      //               "title": "Link 1",
      //               "link": "https://chat.whatsapp.com/LTaeveve7JsAqNHJrkGrGq",
      //               "type": "whatsapp",
      //               "subjectId": 5,
      //               "createdAt": "2024-06-16T19:12:43.020Z",
      //               "updatedAt": "2024-06-16T19:12:43.020Z"
      //           }
      //       ],
      //       "driveLinks": []
      //   },
      //   {
      //       "id": 6,
      //       "title": "Design de IHC",
      //       "image": "https://i.imgur.com/xVCaiK9.png",
      //       "courseId": 1,
      //       "createdAt": "2024-06-16T19:13:35.260Z",
      //       "updatedAt": "2024-06-16T19:13:35.260Z",
      //       "links": false,
      //       "whatsappLinks": [
      //           {
      //               "id": 10,
      //               "title": "Link 1",
      //               "link": "https://chat.whatsapp.com/KYAWmDkKkRFC08fRgbJodP",
      //               "type": "whatsapp",
      //               "subjectId": 6,
      //               "createdAt": "2024-06-16T19:13:35.268Z",
      //               "updatedAt": "2024-06-16T19:13:35.268Z"
      //           }
      //       ],
      //       "driveLinks": []
      //   }
      // ]
      setGroups(data)
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
