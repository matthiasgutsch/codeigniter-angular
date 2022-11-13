import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { UsersService } from './users.service';
import {
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { User } from './user.entity';

type UserWithoutPassword = Omit<User, 'password'>;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: User, status: 200 })
  @ApiTags('users')
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer <TOKEN>',
    required: true,
  })
  @Get('profile')
  @UseGuards(AccessTokenGuard)
  async profile(@Request() req): Promise<UserWithoutPassword> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = await this.usersService.findOne(
      req.user.username,
    );
    return rest;
  }
}
