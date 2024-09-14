import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './models/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReactionsService } from 'src/reactions/reactions.service';
import { UsersService } from 'src/users/users.service';
import { CommentDto } from './models/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private userService: UsersService,
    private reactionService: ReactionsService,
  ) {}

  async findAll() {
    return await this.commentRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number) {
    return await this.commentRepository.findOne({ where: { id: id } });
  }

  async create(userId: number, commentDto: CommentDto) {
    const user = await this.userService.findById(userId);
    const reaction = await this.reactionService.findById(commentDto.reactionId);

    if (!user) throw new NotFoundException('User not found');
    if (!reaction) throw new NotFoundException('Reaction not found');

    this.reactionService.incrementCommentsNumber(reaction);

    const { reactionId, ...commentData } = commentDto;

    const comment = this.commentRepository.create({
      ...commentData,
      user,
      reaction,
    });
    return await this.commentRepository.save(comment);
  }

  async update(id: number, commentDto: CommentDto) {
    const comment = this.commentRepository.findOne({ where: { id: id } });
    if (!comment) throw new NotFoundException('Comment not found');

    const { reactionId, ...commentData } = commentDto;

    return this.commentRepository.update(id, commentData);
  }

  async delete(id: number) {
    return this.commentRepository.delete(id);
  }

  async getCommentsOfReaction(reactionId: number) {
    return this.commentRepository.find({
      where: { reaction: { id: reactionId } },
    });
  }
}
