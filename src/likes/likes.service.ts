import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './models/like.entity';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { LikeDto } from './models/like.dto';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    private userService: UsersService,
    private postService: PostsService,
  ) {}

  async findAll() {
    return await this.likeRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number) {
    return await this.likeRepository.findOne({ where: { id: id } });
  }

  async isPostLikedByUser(userId: number, postId: number) {
    const like = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });

    return !!like;
  }

  async getNotifications(userId: number) {
    const user = await this.userService.findById(userId, {
      relations: ['posts', 'posts.likes'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user.posts.flatMap((post) => post.likes);
  }

  async create(userId: number, likeDto: LikeDto) {
    const user = await this.userService.findById(userId);
    const post = await this.postService.findById(likeDto.postId);

    if (!user) throw new NotFoundException('User not found');
    if (!post) throw new NotFoundException('Post not found');

    this.postService.incrementLikesNumber(post);

    const like = this.likeRepository.create({
      user,
      post,
    });
    return await this.likeRepository.save(like);
  }

  async delete(userId: number, postId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const post = await this.postService.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const like = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    if (!like) throw new NotFoundException('Like not found');

    await this.postService.decrementLikesNumber(post);
    return await this.likeRepository.delete(like.id);
  }
}
