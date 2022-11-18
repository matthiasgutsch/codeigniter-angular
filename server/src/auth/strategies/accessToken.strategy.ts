import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

type JwtPayload = {
  id: number;
  username: string;
  uuid: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, username: user.username, uuid: payload.uuid };
  }
}
