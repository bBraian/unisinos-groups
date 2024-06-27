import { AppLinksProps } from "./AppLink.ts";

interface SubjectProps {
  title: string;
  image: string;
  courseId: number;
  whatsappLinks: AppLinksProps[];
  driveLinks: AppLinksProps[];
}

export interface PullRequestsProps {
  id: number; 
  action: string;
  status: string;
  
  current: SubjectProps; 
  latest: SubjectProps; 
}


