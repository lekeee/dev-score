import { Reaction } from './reaction';
import { User } from './user';

export interface Comment {
  id?: number;
  text: string;
  user?: User;
  reaction?: Reaction;
  createdAt: Date;
}
