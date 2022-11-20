import {
  BadRequestException,
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
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User, UserModel } from 'src/decorators/user.decorator';
import { User as UserEntity } from 'src/users/user.entity';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { Support } from './supports.entity';
import { SupportsService } from './supports.service';

class TotalCountResponse {
  @ApiProperty({
    example: 5,
    description: 'Total found',
  })
  total: number;
}

class PaginateSuppoortResponse {
  @ApiProperty({
    type: [Support],
  })
  data: Support[];
}

@ApiBearerAuth()
@ApiTags('supports')
@Controller('supports')
export class SupportsController {
  constructor(private readonly supportService: SupportsService) {}

  @ApiResponse({ type: TotalCountResponse })
  @Get('count')
  @UseGuards(AccessTokenGuard)
  async count(@User() user: UserEntity): Promise<TotalCountResponse> {
    const total = await this.supportService.getTotalCount(user);
    return { total };
  }

  @ApiResponse({ type: PaginateSuppoortResponse })
  @Get()
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Support>> {
    const res = await this.supportService.findAll(query);
    if (!res) {
      throw new NotFoundException({ message: 'generic message' });
    }
    return res;
  }

  @ApiResponse({ type: Support })
  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id') id: number): Promise<Support> {
    const res = await this.supportService.findOne(id);
    if (!res) {
      throw new NotFoundException({ message: 'generic message' });
    }
    return res;
  }

  @ApiResponse({ type: Support, status: 201 })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AccessTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @User() user: UserModel,
    @Body() support: Support,
  ): Promise<Support> {
    const resp = await this.supportService.create(user, support);
    if (!resp) {
      throw new BadRequestException();
    }
    const id = resp.identifiers.map(({ id }) => id)[0];
    return { id, ...support };
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
