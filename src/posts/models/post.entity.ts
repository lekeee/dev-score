import { User } from 'src/users/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.Posts, { eager: true })
  user: User;
}
