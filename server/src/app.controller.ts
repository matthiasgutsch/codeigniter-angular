import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    // @Body('username') username: string,
    // @Body('password') password: string,
    @Body() user: { username: string; password: string },
  ) {
    // return this.authService.login({ username, password });
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
