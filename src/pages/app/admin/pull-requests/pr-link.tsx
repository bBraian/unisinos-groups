import { useEffect, useState } from "react";
import { AppLinksProps } from "@/@types/AppLink.ts";
import svgWhatsIcon from '../../../../assets/whatsapp.svg'
import svgDriveIcon from '../../../../assets/drive.svg'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LinkProps extends AppLinksProps {
  isEditting: boolean
  pullRequestId?: number
}

interface CustomAppLinkProps {
  type: 'whatsapp' | 'drive';
  appClassLinks: AppLinksProps[];
  linkIdUpdated?: number;
}

const prLinkProps = {
  whatsapp: {
    badgeStyle: 'bg-green-400',
    icon: svgWhatsIcon,
    amount: 5
  },
  drive: {
    badgeStyle: 'bg-blue-400',
    icon: svgDriveIcon,
    amount: 2
  }
}


export function PrLink({type, appClassLinks, linkIdUpdated} :CustomAppLinkProps) {
  const [appLink, setAppLink] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linkWithIsEditing = appClassLinks.map(link => ({
      ...link,
      isEditting: false
    }));
    
    setAppLink(linkWithIsEditing);
  }, []);

  return (
    <>
      {appLink.length > 0 && (
        <div className="flex w-full items-center gap-2">
          <div className='flex flex-col w-full gap-2'>
            
              {appLink.map((link) => {
                return (
                  <div 
                    className={`
                      relative flex w-full gap-2 
                      ${link.pullRequestId && 'bg-[#21733026]'}
                      ${linkIdUpdated == link.id && 'bg-[#f88b4926]'}
                    `} 
                    key={link.id}
                  >
                    <div className="flex flex-col p-3 w-full border-2 rounded-md overflow-hidden items-end gap-2">
                      <div className='flex w-full items-center gap-2'>
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input
                          placeholder="Nome"
                          value={link.title}
                          readOnly
                        />
                      </div>
                      <div className='flex w-full items-center gap-2'>
                        <Label htmlFor="link" className="text-right">Link</Label>
                        <Input
                          placeholder="Link"
                          value={link.link}
                          readOnly
                        />
                      </div>
                      <div className={`absolute top-1 left-1 w-5 h-5 rounded-md flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2 ${prLinkProps[type].badgeStyle}`}>
                        <img src={prLinkProps[type].icon} className="w-3.5 h-3.5" alt="" />
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
    
  );
};
