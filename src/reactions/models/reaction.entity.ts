import { Comment } from 'src/comments/models/comment.entity';
import { Post } from 'src/posts/models/post.entity';
import { User } from 'src/users/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number; //0 for positive 1 for negative

  @Column()
  text: string;

  @Column({ default: 0 })
  commentsNumber: number;

  @ManyToOne(() => User, (user) => user.reactions, { eager: true })
  user: User;

  @ManyToOne(() => Post, (post) => post.reactions, { eager: true })
  post: Post;

  @OneToMany(() => Comment, (comment) => comment.reaction)
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
