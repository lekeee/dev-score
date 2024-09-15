import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './models/like.entity';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { LikeDto } from './models/like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository,
    private userService: UsersService,
    private postService: PostsService,
  ) {}

  async findAll() {
    return await this.likeRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number) {
    return await this.likeRepository.findOne({ where: { id: id } });
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

  async delete(id: number) {
    return this.likeRepository.delete(id);
  }
}
