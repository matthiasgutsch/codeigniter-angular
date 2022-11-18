import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, UserModel } from '../decorators/user.decorator';
import { User as UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user: UserModel) {
    return this.authService.login(user);
  }

  @Post('signup')
  async register(@Body() user: UserEntity) {
    return this.userService.createUser(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@User() user: UserModel) {
    return this.userService.removeRefreshToken(user.uuid);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@User() user: UserModel & { refreshToken: string }) {
    return this.authService.refreshTokens(
      user.id,
      user.refreshToken,
      user.uuid,
    );
  }
}
