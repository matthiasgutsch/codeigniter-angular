import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
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
      const password = await hash(strPassword, saltOrRounds);
      const newUser = await this.usersRepository.save({ ...rest, password });
      return { id: newUser.id };
    } catch (error) {
      console.log(error);
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
}
