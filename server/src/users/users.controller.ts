import {
  Controller,
  Get,
  UseGuards,
  // Request,
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
import { User as UserEntity } from './user.entity';
import { User, UserModel } from 'src/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: UserEntity, status: 200 })
  @ApiTags('users')
  @ApiHeader({
    name: 'Authorization',
    example: 'Bearer <TOKEN>',
    required: true,
  })
  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  // async profile(@Request() req): Promise<User> {
  async profile(@User() user: UserModel): Promise<UserEntity> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userFound = await this.usersService.findOneById(user.id);
    return new UserEntity(userFound);
  }
}
