import {
  Controller,
  Get,
  UseGuards,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { UsersService } from './users.service';
import {
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { User } from './user.entity';

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
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@Request() req): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.usersService.findOne(req.user.username);
    return new User(user);
  }
}
