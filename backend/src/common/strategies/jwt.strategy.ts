import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CookieService } from '../services/cookie.service';
import { JwtToken } from '../../modules/auth/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private cookieService: CookieService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', ''),
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieService.extractAuthTokenCookie,
      ]),
    });
  }

  async validate(payload: JwtToken) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
