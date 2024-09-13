import { User } from './user';

export interface Post {
  id?: number;
  title: string;
  description: string;
  language: string;
  code: string;
  user?: User;
  createdAt: Date;
}
