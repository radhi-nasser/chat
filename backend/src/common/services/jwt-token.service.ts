import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  private readonly jwtSecret: string;
  private readonly jwtTokenExpirationTime: string;
  private readonly jwtRefreshTokenExpirationTime: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET', '');
    this.jwtTokenExpirationTime = this.configService.get<string>(
      'JWT_TOKEN_EXPIRATION_TIME',
      '',
    );
    this.jwtRefreshTokenExpirationTime = configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      '',
    );
  }

  createJwtToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtTokenExpirationTime,
      },
    );
  }

  createJwtRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtRefreshTokenExpirationTime,
      },
    );
  }
}
