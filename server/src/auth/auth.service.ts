import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.isActive && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    await this.usersService.deleteOldRefreshToken();
    const uuid = uuidv4().toString();
    const tokens = await this.getTokens(user.id, user.username, uuid);
    await this.usersService.saveRefreshToken(
      user.id,
      tokens.refreshToken,
      uuid,
    );
    return tokens;
  }

  async getTokens(id: number, username: string, uuid: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          username,
          uuid,
        },
        {
          secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRES_IS'),
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          username,
          uuid,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: number, refreshToken, uuid: string) {
    await this.usersService.deleteOldRefreshToken();
    const user = await this.usersService.findOneById(id);
    if (!user) throw new ForbiddenException('Access Denied');
    const token = await this.usersService.findOneRefreshTokenByUUID(uuid);
    if (!token) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, token.token);
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied, token not valid');

    await this.usersService.removeRefreshToken(uuid);
    const uuidNew = uuidv4().toString();
    const tokens = await this.getTokens(user.id, user.username, uuidNew);
    await this.usersService.saveRefreshToken(
      user.id,
      tokens.refreshToken,
      uuidNew,
    );
    return tokens;
  }
}
