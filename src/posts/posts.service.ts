import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './models/post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './models/post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async findAll() {
    return await this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number) {
    return await this.postRepository.findOne({ where: { id: id } });
  }

  async create(userId: number, postDto: PostDto) {
    const user = await this.userService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const post = this.postRepository.create({ ...postDto, user });
    return await this.postRepository.save(post);
  }

  async update(id: number, postDto: PostDto) {
    const post = this.postRepository.findOne({ where: { id: id } });
    if (!post) throw new NotFoundException('Post not found');
    return await this.postRepository.update(id, postDto);
  }

  async incrementReactionsNumber(post: PostDto) {
    post.reactionsNumber++;
    await this.postRepository.save(post);
  }

  async incrementLikesNumber(post: PostDto) {
    post.likesNumber++;
    await this.postRepository.save(post);
  }

  async decrementLikesNumber(post: PostDto) {
    post.likesNumber--;
    await this.postRepository.save(post);
  }

  async delete(id: number) {
    return this.postRepository.delete(id);
  }

  async getPostsByUser(userId: number) {
    return this.postRepository.find({ where: { user: { id: userId } } });
  }
}
