import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDto } from './models/auth-register.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  public register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.userService.create(authRegisterDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  public login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Request() req) {
    return req.user;
  }
}
