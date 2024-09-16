import { User } from '../models/user';

export type Notification = {
  user: User | undefined;
  text: string;
  date: Date;
  time: string;
};
