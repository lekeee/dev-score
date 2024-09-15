import { Like } from 'src/likes/models/like.entity';
import { Reaction } from 'src/reactions/models/reaction.entity';
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
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  language: string;

  @Column('text')
  code: string;

  @Column({ default: 0 })
  reactionsNumber: number;

  @Column({ default: 0 })
  likesNumber: number;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
