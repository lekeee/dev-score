import { Reaction } from 'src/reactions/models/reaction.entity';
import { User } from 'src/users/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Reaction, (reaction) => reaction.comments, { eager: true })
  reaction: Reaction;

  @CreateDateColumn()
  createdAt: Date;
}
