import { Post } from 'src/posts/models/post.entity';
import { User } from 'src/users/models/user.entity';

export class ReactionDto {
  type: number; //0 for positive 1 for negative
  text: string;
  postId: number;
}
