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
  deleteLike(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.delete(id);
  }
}
