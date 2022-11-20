import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/decorators/user.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Support } from './supports.entity';
import {
  // FilterOperator,
  // Paginate,
  PaginateQuery,
  paginate,
  Paginated,
} from 'nestjs-paginate';

@Injectable()
export class SupportsService {
  constructor(
    @InjectRepository(Support)
    private readonly supportsRepository: Repository<Support>,
    private readonly userService: UsersService,
  ) {}

  async getTotalCount(user: User): Promise<number> {
    return await this.supportsRepository
      .createQueryBuilder()
      .where('userid = :user', { user: user.id })
      .andWhere('is_active = :isActive', { isActive: true })
      .getCount();
  }

  async findOne(id): Promise<Support> {
    const result = await this.supportsRepository.findOne({
      where: {
        id,
      },
      // relations: {
      //   user: true,
      // },
    });
    return result;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Support>> {
    return paginate(query, this.supportsRepository, {
      sortableColumns: ['id'],
      // nullSort: 'last',
      searchableColumns: [],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        // age: [FilterOperator.GTE, FilterOperator.LTE],
      },
    });
  }

  async create(userParam: UserModel, support: Support): Promise<InsertResult> {
    const result = await this.supportsRepository.insert({
      ...support,
      userId: userParam.id,
    });
    return result;
  }

  async update(id: number, support: Support): Promise<UpdateResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user: _0, userId: _1, ...rest } = support;
    const result = await this.supportsRepository.update(id, { ...rest });
    return result;
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.supportsRepository.delete(id);
    return result;
  }
}
