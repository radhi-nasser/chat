import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginController } from './controllers/login.controller';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { RegisterController } from './controllers/register.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GetCurrentUserController } from './controllers/get-current-user.controller';
import { JwtStrategy } from '../../common/strategies/jwt.strategy';
import { CookieService } from '../../common/services/cookie.service';
import { JwtTokenService } from '../../common/services/jwt-token.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [LoginController, RegisterController, GetCurrentUserController],
  providers: [
    PrismaService,
    ConfigService,
    JwtTokenService,
    CookieService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
