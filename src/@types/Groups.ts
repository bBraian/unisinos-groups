import { AppLinksProps } from "./appLink";

export interface GroupsProps {
  id: number; 
  course: number; 
  title: string; 
  image: string; 
  whatsappLinks: AppLinksProps[];
  driveLinks: AppLinksProps[]
}