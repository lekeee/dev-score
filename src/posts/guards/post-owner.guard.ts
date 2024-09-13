import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from 'src/posts/models/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly postService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const postId = request.params.id;

    const post: Post = await this.postService.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    if (post.user.id !== user.userId)
      throw new ForbiddenException('You are not allowed to update this post');

    return true;
  }
}
