import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PostDto } from './models/post.dto';
import { PostOwnerGuard } from './guards/post-owner.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @UseGuards(JwtGuard)
  @Get('user')
  getPostsByUser(@Req() req) {
    return this.postService.getPostsByUser(req.user.userId);
  }

  @Get('trending')
  getTrendingPosts() {
    return this.postService.findTrendingPosts();
  }

  @Get()
  getPosts(
    @Query('title') title?: string,
    @Query('language') language?: string,
  ) {
    const filter = { title, language };
    return this.postService.findAll(filter);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  addPost(@Body() postDto: PostDto, @Req() req) {
    return this.postService.create(req.user.userId, postDto);
  }

  @UseGuards(JwtGuard, PostOwnerGuard)
  @Put(':id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() postDto: PostDto) {
    return this.postService.update(id, postDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
