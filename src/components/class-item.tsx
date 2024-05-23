import svgWhatsIcon from '../assets/whatsapp.svg'
import svgDriveIcon from '../assets/drive.svg'
import { Badge } from './badge';

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

interface ClassItemProps {
  props: {
    id: number;
    course: number;
    title: string;
    image: string;
    whatsappLink: string;
  }
}

export function ClassItem({props} :ClassItemProps) {
  return (
    <div className="flex flex-col p-3 w-full border-2 border-border rounded-md gap-1 relative hover:bg-accent overflow-hidden">
      <div className="inline-flex justify-between">
        <div className="flex flex-row items-center gap-1">
          <img src={props.image} className="w-16 h-16 rounded-sm mr-2.5" alt="" />
          <div className='flex flex-col gap-3.5'>
            <h2 className="font-semibold text-lg h-full hover:cursor-pointer hover:text-slate-500 leading-4">
              {props.title}
            </h2>
            <div className='flex gap-2'>
              <Badge props={whatsIconProps} />
              <Badge props={svgDriveProps} />
            </div>
          </div>
          
        </div>
      </div>
      <div className='absolute w-2 bg-green-500 top-0 right-0 bottom-0 m-2 rounded-[2px]'></div>
    </div>
  );
};
