import { Post } from './post';
import { User } from './user';

export interface Reaction {
  id?: number;
  type: number;
  text: string;
  user?: User;
  post?: Post;
  createdAt: Date;
}
