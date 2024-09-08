import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';

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

  @Put(':id')
  public updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
