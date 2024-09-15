import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { LikeDto } from './models/like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @UseGuards(JwtGuard)
  @Get('post/:id')
  isPostLikedByUser(@Param('id', ParseIntPipe) postId: number, @Req() req) {
    return this.likeService.isPostLikedByUser(req.user.userId, postId);
  }

  @Get()
  getLikes() {
    return this.likeService.findAll();
  }

  @UseGuards(JwtGuard)
  @Post()
  addLike(@Body() likeDto: LikeDto, @Req() req) {
    return this.likeService.create(req.user.userId, likeDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteLike(@Param('id', ParseIntPipe) postId: number, @Req() req) {
    return this.likeService.delete(req.user.userId, postId);
  }
}
