import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(user: any) {
    const tokens = await this.getTokens(user.id, user.username);
    await this.usersService.saveRefreshToken(
      user.username,
      tokens.refreshToken,
    );
    return tokens;
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('JWT_TOKEN_EXPIRES_IS'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          username,
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

  async refreshTokens(username: string, refreshToken: string) {
    const user = await this.usersService.findOne(username);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied, token not valid');
    const tokens = await this.getTokens(user.id.toString(), user.username);
    await this.usersService.saveRefreshToken(
      user.username,
      tokens.refreshToken,
    );
    return tokens;
  }
}
