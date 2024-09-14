import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentDto } from './models/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('reaction/:id')
  getCommentsOfReaction(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getCommentsOfReaction(id);
  }

  @Get()
  getComments() {
    return this.commentService.findAll();
  }

  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  addReaction(@Body() commentDto: CommentDto, @Req() req) {
    return this.commentService.create(req.user.userId, commentDto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() commentDto: CommentDto,
  ) {
    return this.commentService.update(id, commentDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.delete(id);
  }
}
