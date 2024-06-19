import svgWhatsIcon from '../../../../assets/whatsapp.svg'
import svgDriveIcon from '../../../../assets/drive.svg'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { History } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getInitials } from '@/utils/get-initials';
import { Badge } from '@/components/badge';
import { PrLink } from './pr-link';
import { Button } from '@/components/ui/button';

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

interface ClassItemProps {
  props: {
    id: number;
    course: number;
    title: string;
    image: string;
    whatsappLinks: AppLinkProps[];
    driveLinks: AppLinkProps[];
  }
}

export function PrItem({props: { image, title, whatsappLinks, driveLinks, id }} :ClassItemProps) {
  return (
    <Dialog>
      <DialogTrigger className="relative flex flex-col p-3 w-full border-2 rounded-md gap-1 hover:bg-accent">
        {id == 0 && (
          <div className="absolute top-0 left-0 bg-orange-400 text-white text-[11px] font-bold flex items-center justify-center rounded-full w-5 h-5 transform -translate-x-1/2 -translate-y-1/2">
            <History size={15} strokeWidth={3} />
          </div>
        )}
        <div className="inline-flex justify-between">
          <div className="flex flex-row items-center gap-1">
            {image ? (
              <img src={image} className="w-16 h-16 rounded-sm mr-2.5" alt="" />
            ) : (
              <div className="w-16 h-16 rounded-sm mr-2.5 bg-muted flex justify-center items-center font-bold text-lg tracking-wider">
                {getInitials(title)}
              </div>
            )}
            <div className='flex flex-col gap-3.5'>
              <h2 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500 leading-4">
                {title}
              </h2>
              <div className='flex gap-2'>
                {whatsappLinks.length > 0 && (
                  <Badge props={whatsIconProps} amount={whatsappLinks.length} />
                )}
                {driveLinks.length > 0 && (
                  <Badge props={svgDriveProps} amount={driveLinks.length} />
                )}
              </div>
            </div>
            
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className='flex flex-row items-center'>
          {image ? (
            <img src={image} className="w-6 h-6 rounded-sm mr-2.5 mt-[6px]" alt="" />
          ) : (
            <div className="w-6 h-6 rounded-sm mr-2.5 mt-[6px] bg-muted"></div>
          )}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          
        <div className='flex items-center gap-5'>
          <div className="max-w-[380px] flex flex-col p-4 w-full border-2 rounded-md overflow-hidden items-end gap-4 bg-zinc-900">
            <PrLink type='whatsapp' appClassLinks={whatsappLinks} classTitle={title} classId={id} />

            <Separator />

            <PrLink type='drive' appClassLinks={driveLinks} classTitle={title} classId={id} />
          </div>
          <Separator orientation='vertical' />
          <div className="max-w-[380px] flex flex-col p-4 w-full border-2 rounded-md overflow-hidden items-end gap-4">
            <PrLink type='whatsapp' appClassLinks={whatsappLinks} classTitle={title} classId={id} />

            <Separator />

            <PrLink type='drive' appClassLinks={driveLinks} classTitle={title} classId={id} />
          </div>
        </div>

        <Button>Aprovar</Button>

      </DialogContent>
    </Dialog>
  );
};
