import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { ReactionsModule } from 'src/reactions/reactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, ReactionsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
