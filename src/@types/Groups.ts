import { AppLinksProps } from "./AppLink.ts";

export interface GroupsProps {
  id: number;
  courseId: number;
  title: string;
  image: string | null;
  whatsappLinks: AppLinksProps[];
  driveLinks: AppLinksProps[]
}
