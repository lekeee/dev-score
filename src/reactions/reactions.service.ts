import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './models/reaction.entity';
import { Repository } from 'typeorm';
import { ReactionDto } from './models/reaction.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    private userService: UsersService,
    private postService: PostsService,
  ) {}

  async findAll() {
    return await this.reactionRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number) {
    return await this.reactionRepository.findOne({ where: { id: id } });
  }

  async create(userId: number, reactionDto: ReactionDto) {
    const user = await this.userService.findById(userId);
    const post = await this.postService.findById(reactionDto.postId);

    if (!user) throw new NotFoundException('User not found');
    if (!post) throw new NotFoundException('Post not found');

    const reaction = this.reactionRepository.create({
      ...reactionDto,
      user,
      post,
    });
    return await this.reactionRepository.save(reaction);
  }

  async update(id: number, reactionDto: ReactionDto) {
    const reaction = this.reactionRepository.findOne({ where: { id: id } });
    if (!reaction) throw new NotFoundException('Reaction not found');
    return this.reactionRepository.update(id, reactionDto);
  }

  async delete(id: number) {
    return this.reactionRepository.delete(id);
  }

  async getReactionsOfPost(postId: number) {
    return this.reactionRepository.find({ where: { post: { id: postId } } });
  }
}
