import { User } from './user';

export interface Post {
  id?: number;
  title: string;
  description: string;
  language: string;
  code: string;
  reactionsNumber: number;
  likesNumber: number;
  user?: User;
  createdAt: Date;
}
