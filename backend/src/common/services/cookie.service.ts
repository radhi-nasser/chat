import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';
import * as ms from 'ms';

const AUTH_COOKIE_NAME = 'auth';
const AUTH_REFRESH_COOKIE_NAME = 'auth-refresh';
const PATH_REFRESH = `/auth/refresh`;

@Injectable()
export class CookieService {
  private readonly secureCookies: boolean;
  private readonly jwtTokenExpirationTime: string;
  private readonly jwtRefreshTokenExpirationTime: string;

  constructor(private configService: ConfigService) {
    this.secureCookies =
      this.configService.get<string>('SECURE_COOKIES') === 'true';
    this.jwtTokenExpirationTime = this.configService.get<string>(
      'JWT_TOKEN_EXPIRATION_TIME',
      '',
    );
    this.jwtRefreshTokenExpirationTime = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      '',
    );
  }

  setTokenCookie(res: Response, token: string): void {
    // set the cookie to http only so it is not accessible via javascript
    res.cookie(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: this.secureCookies,
      expires: dayjs().add(ms(this.jwtTokenExpirationTime, 'ms')).toDate(),
    });
  }
  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    // set the cookie to http only so it is not accessible via javascript
    res.cookie(AUTH_REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: this.secureCookies,
      path: PATH_REFRESH,
      expires: dayjs()
        .add(ms(this.jwtRefreshTokenExpirationTime, 'ms'))
        .toDate(),
    });
  }

  extractAuthTokenCookie(req?: Request): string | null {
    const token = req?.cookies?.[AUTH_COOKIE_NAME];
    return token || null;
  }
}
