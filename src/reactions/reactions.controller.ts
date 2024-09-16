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
import { ReactionsService } from './reactions.service';
import { ReactionDto } from './models/reaction.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionService: ReactionsService) {}

  @Get('post/:id')
  getReactionsofPost(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.getReactionsOfPost(id);
  }

  @UseGuards(JwtGuard)
  @Get('notifications')
  getReactionsOfUserPosts(@Req() req) {
    return this.reactionService.getNotifications(req.user.userId);
  }

  @Get()
  getReactions() {
    return this.reactionService.findAll();
  }

  @Get(':id')
  getReaction(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  addReaction(@Body() reactionDto: ReactionDto, @Req() req) {
    return this.reactionService.create(req.user.userId, reactionDto);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateReaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() reactionDto: ReactionDto,
  ) {
    return this.reactionService.update(id, reactionDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteReaction(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.delete(id);
  }
}
