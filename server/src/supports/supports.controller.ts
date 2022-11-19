import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, UserModel } from 'src/decorators/user.decorator';
import { User as UserEntity } from 'src/users/user.entity';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Support } from './supports.entity';
import { SupportsService } from './supports.service';

@Controller('supports')
export class SupportsController {
  constructor(private readonly supportService: SupportsService) {}
  @Get('count')
  @UseGuards(AccessTokenGuard)
  async count(@User() user: UserEntity) {
    return await this.supportService.getTotalCount(user);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async getOne(@Param('id') id: number) {
    const res = await this.supportService.getOne(id);
    if (!res) {
      throw new NotFoundException({ message: 'generic message' });
    }
    return res;
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@User() user: UserModel, @Body() support: Support) {
    const resp = await this.supportService.create(user, support);
    return resp;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Body() support: Support, @Param() id: number) {
    await this.supportService.update(id, support);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(@Param() id: number) {
    await this.supportService.delete(id);
  }
}
