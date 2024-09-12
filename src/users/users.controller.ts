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
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { extname } from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const originalName = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    cb(null, `${originalName}${fileExtName}`);
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

    return this.userService.update(req.user.userId, {
      image: file.originalname,
    });
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
