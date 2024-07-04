import svgWhatsIcon from '../../../../assets/whatsapp.svg'
import svgDriveIcon from '../../../../assets/drive.svg'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CircleCheckBig, CircleX, History } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/utils/get-initials';
import { Badge } from '@/components/badge';
import { PrLink } from './pr-link';
import { Button } from '@/components/ui/button';
import { api } from '@/api/axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { PullRequestsProps } from '@/@types/PullRequests';

const whatsIconProps = {
    badgeStyle: 'bg-green-400',
    icon: svgWhatsIcon,
    amount: 5
}

const svgDriveProps = {
    badgeStyle: 'bg-blue-400',
    icon: svgDriveIcon,
    amount: 2
}

interface AppLinkProps {
  id: number;
  title: string;
  link: string;
  isEditing?: boolean;
}

interface SubjectProps {
  title: string;
  image: string;
  courseId: number;
  whatsappLinks: AppLinkProps[];
  driveLinks: AppLinkProps[];
  pullRequestId?: number;
  linkIdUpdated?: number;
}

interface ClassItemProps {
  props: {
    id: number; 
    action: string;
    status: string;
    current: SubjectProps;
    latest: SubjectProps;
  },
  setPullRequests: React.Dispatch<React.SetStateAction<PullRequestsProps[]>>;
}

export function PrItem({props: { current, latest, id, action }, setPullRequests} :ClassItemProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const subjectImage = action == 'new' ? latest.image : current.image
  const subjectTitle = action == 'new' ? latest.title : current.title
  const subjectWhatsappLinks = action == 'new' ? latest.whatsappLinks : current.whatsappLinks
  const subjectDriveLinks = action == 'new' ? latest.driveLinks : current.driveLinks
  async function approvePr() {
    const toastId = toast.loading('Aprovando Pull Request')
    setIsLoading(true)
    api.put(`pull-request/approve/${id}`)
    .then((res) => {
      console.log(res)
      toast.success('Pull request aprovado com sucesso!')
      setIsLoading(false)
      toast.dismiss(toastId)
      setOpen(false)
      setPullRequests((prevState) => prevState.filter(pr => pr.id !== id));
    })
    .catch((e) => {
      if(e.response?.data?.message) {
        toast.error(e.response.data.message);
      } else {
          toast.error('Erro ao aprovar Pull Request');
      }
      setIsLoading(false)
      console.log(e)
      toast.dismiss(toastId)
    })
  }

  async function rejectPr() {
    const toastId = toast.loading('Rejeitando Pull Request')
    setIsLoading(true)
    api.put(`pull-request/reject/${id}`)
    .then((res) => {
      console.log(res)
      toast.success('Pull request rejeitado com sucesso!')
      setIsLoading(false)
      toast.dismiss(toastId)
      setOpen(false)
      setPullRequests((prevState) => prevState.filter(pr => pr.id !== id));
    })
    .catch((e) => {
      if(e.response?.data?.message) {
        toast.error(e.response.data.message);
      } else {
          toast.error('Erro ao reprovar Pull Request');
      }
      setIsLoading(false)
      console.log(e)
      toast.dismiss(toastId)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative flex flex-col p-3 w-full border-2 rounded-md gap-1 hover:bg-accent">
        {id == 0 && (
          <div className="absolute top-0 left-0 bg-orange-400 text-white text-[11px] font-bold flex items-center justify-center rounded-full w-5 h-5 transform -translate-x-1/2 -translate-y-1/2">
            <History size={15} strokeWidth={3} />
          </div>
        )}
        <div className="inline-flex justify-between">
          <div className="flex flex-row items-center gap-1">
            {subjectImage ? (
              <img src={subjectImage} className="w-16 h-16 rounded-sm mr-2.5" alt="" />
            ) : (
              <div className="w-16 h-16 rounded-sm mr-2.5 bg-muted flex justify-center items-center font-bold text-lg tracking-wider">
                {getInitials(subjectTitle)}
              </div>
            )}
            <div className='flex flex-col gap-3.5'>
              <h2 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500 leading-4">
                {subjectTitle}
              </h2>
              <div className='flex gap-2'>
                {subjectWhatsappLinks.length > 0 && (
                  <Badge props={whatsIconProps} amount={subjectWhatsappLinks.length} />
                )}
                {subjectDriveLinks.length > 0 && (
                  <Badge props={svgDriveProps} amount={subjectDriveLinks.length} />
                )}
              </div>
            </div>
            
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-auto">
        <DialogHeader className='flex flex-row items-center'>
          {subjectImage ? (
            <img src={subjectImage} className="w-6 h-6 rounded-sm mr-2.5 mt-[6px]" alt="" />
          ) : (
            <div className="w-6 h-6 rounded-sm mr-2.5 mt-[6px] bg-muted"></div>
          )}
          <DialogTitle>{subjectTitle}</DialogTitle>
        </DialogHeader>
          
        <div className='flex items-center gap-5'>
          {action != 'new' && (
            <>
              <div className="relative max-w-[380px] flex flex-col p-4 w-full border-2 rounded-md gap-4 bg-zinc-900 items-end">
                <span className='absolute -top-1 text-xs transform -translate-y-1/2 px-2 py-1 border-2 rounded-md bg-zinc-900 text-muted-foreground'>Atual</span>
                <PrLink type='whatsapp' appClassLinks={current.whatsappLinks} linkIdUpdated={current.linkIdUpdated} />

                {current.whatsappLinks.length > 0 && current.driveLinks.length > 0 && (<Separator />)}

                <PrLink type='drive' appClassLinks={current.driveLinks} linkIdUpdated={current.linkIdUpdated} />
              </div>
              <Separator orientation='vertical' />
            </>
            
          )}
          
          <div className="relative max-w-[380px] flex flex-col p-4 w-full border-2 rounded-md items-end gap-4">
            <span className='absolute -top-1 text-xs transform -translate-y-1/2 px-2 py-1 border-2 rounded-md bg-zinc-900 text-green-400'>Nova</span>
            <PrLink type='whatsapp' appClassLinks={latest.whatsappLinks} />

            {latest.whatsappLinks.length > 0 && latest.driveLinks.length > 0 && (<Separator />)}

            <PrLink type='drive' appClassLinks={latest.driveLinks} />
          </div>
        </div>
        <div className='flex flex-row gap-2.5 w-full justify-end'>
          <Button variant='outline' className='gap-2 text-red-500' type='button' disabled={isLoading} onClick={rejectPr}><CircleX className='w-5 h-5' /> Rejeitar</Button>
          <Button variant='outline' className='gap-2 text-green-500' type='button' disabled={isLoading} onClick={approvePr}><CircleCheckBig className='w-5 h-5' /> Aprovar</Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};
