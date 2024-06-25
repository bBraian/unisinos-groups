import { AppLinksProps } from "./AppLink.ts";

export interface PullRequestsProps {
  id: number; 
  course: number; 
  title: string; 
  image: string;
  action: string;
  whatsappLinks: AppLinksProps[];
  driveLinks: AppLinksProps[]
}