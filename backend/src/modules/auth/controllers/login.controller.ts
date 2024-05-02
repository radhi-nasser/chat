import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../../common/guards/local.guard';
import { Request, Response } from 'express';
import { CookieService } from '../../../common/services/cookie.service';
import { JwtTokenService } from '../../../common/services/jwt-token.service';
import { User } from '@prisma/client';

@Controller()
export class LoginController {
  constructor(
    private jwtTokenService: JwtTokenService,
    private cookieService: CookieService,
  ) {}

  @Post('/auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userToken = req.user as User;

    const token = await this.jwtTokenService.createJwtToken(userToken.id);
    const refreshToken = await this.jwtTokenService.createJwtRefreshToken(
      userToken.id,
    );

    this.cookieService.setTokenCookie(res, token);
    this.cookieService.setRefreshTokenCookie(res, refreshToken);
  }
}
