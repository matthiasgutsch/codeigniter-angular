import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { User } from './user.entity';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly configService: ConfigService,
  ) {}

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async findOneRefreshTokenByUUID(uuid: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOneBy({ uuid });
  }

  async hashRefreshToken(token: string) {
    return await hash(token, saltOrRounds);
  }

  async createUser(user: User): Promise<{ id: number }> {
    if (!user.password || (user.password && user.password.length < 3)) {
      throw new BadRequestException({
        code: 'PASSWORD',
        message: 'password is requered',
      });
    }
    if (!user.username || (user.username && user.username.length < 3)) {
      throw new BadRequestException({
        code: 'USERNAME',
        message: 'usename is requered',
      });
    }
    try {
      const { password: strPassword, ...rest } = user;
      const password = await this.hashRefreshToken(strPassword);
      const newUser = await this.usersRepository.save({ ...rest, password });
      return { id: newUser.id };
    } catch (error) {
      console.warn(error);
      switch (error.code) {
        case 'ER_NO_DEFAULT_FOR_FIELD': {
          throw new BadRequestException({ message: error.sqlMessage });
        }
        case 'ER_DUP_ENTRY': {
          throw new BadRequestException({ message: error.sqlMessage });
        }
        default: {
          throw new BadRequestException({ message: 'generic message' });
        }
      }
    }
  }

  async saveRefreshToken(id: number, refreshToken: string, uuid: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    const {
      groups: { time, unit },
    } = this.configService
      .get('JWT_REFRESH_TOKEN_EXPIRES_IN')
      .match(/(?<time>\d+)(?<unit>[dwMQyhmsms]{1})/);
    const expires_at = dayjs
      .utc()
      .add(+time, unit as dayjs.ManipulateType)
      .toISOString()
      .slice(0, -1);
    const token = await this.hashRefreshToken(refreshToken);
    await this.refreshTokenRepository.save({ token, user, expires_at, uuid });
  }

  async deleteOldRefreshToken() {
    const expires_at = dayjs.utc().toISOString().slice(0, -1);
    await this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .where('expires_at <= :expires_at', { expires_at: expires_at })
      .execute();
  }

  async removeRefreshToken(uuid: string) {
    return await this.refreshTokenRepository.delete({ uuid });
  }
}
