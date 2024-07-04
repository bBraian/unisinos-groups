import { History } from 'lucide-react'

interface ClassItemProps {
  props: {
    id: number; 
    user_name: string;
    feedback: string;
    createdAt: string;
  },
}

export function Feedbacks({props: { id, user_name, feedback }} :ClassItemProps) {

  return (
    <>
      <div>
        <div className="relative flex flex-col p-3 w-full border-2 rounded-md gap-1">
          {id == 0 && (
            <div className="absolute top-0 left-0 bg-orange-400 text-white text-[11px] font-bold flex items-center justify-center rounded-full w-5 h-5 transform -translate-x-1/2 -translate-y-1/2">
              <History size={15} strokeWidth={3} />
            </div>
          )}
          <h2 className="font-semibold text-lg h-full leading-4">
            {user_name}
          </h2>
          <div className='flex gap-2'>
            <p>{feedback}</p>
          </div>
        </div>
      </div>
    </>
  )
}