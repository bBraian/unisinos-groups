import svgWhatsIcon from '../assets/whatsapp.svg'
import svgDriveIcon from '../assets/drive.svg'
import { Badge } from './badge';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { History } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AppLink } from './app-link';


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

export function ClassItem({props: { image, title, whatsappLinks, driveLinks, id }} :ClassItemProps) {

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
              <div className="w-16 h-16 rounded-sm mr-2.5 bg-muted"></div>
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
        {/* <div className='absolute w-2 bg-green-500 top-0 right-0 bottom-0 m-2 rounded-[2px]'></div> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className='flex flex-row items-center'>
          {image ? (
            <img src={image} className="w-6 h-6 rounded-sm mr-2.5 mt-[6px]" alt="" />
          ) : (
            <div className="w-6 h-6 rounded-sm mr-2.5 mt-[6px] bg-muted"></div>
          )}
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          
        <AppLink type='whatsapp' appClassLinks={whatsappLinks} classTitle={title} classId={id} />

        <Separator />

        <AppLink type='drive' appClassLinks={driveLinks} classTitle={title} classId={id} />

      </DialogContent>
    </Dialog>
  );
};
