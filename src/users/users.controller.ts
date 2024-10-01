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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDto } from './models/user.dto';
import { UsersService } from './users.service';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueImageName = `${Date.now()}${extname(file.originalname)}`;
    cb(null, `${uniqueImageName}`);
  },
});

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public getUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  public addUser(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image', { storage }))
  public async uploadImage(@UploadedFile() file, @Req() req) {
    const user = await this.userService.findById(req.user.userId);

    if (user.image) {
      const imagePath = `./uploads/${user.image}`;
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await this.userService.update(req.user.userId, {
      image: file.filename,
    });

    return { image: file.filename };
  }

  @Put()
  @UseGuards(JwtGuard)
  public updateUser(@Req() req, @Body() userDto: UserDto) {
    return this.userService.update(req.user.userId, userDto);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
