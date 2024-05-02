import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyPassword } from 'src/modules/auth/password';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (user === null || !user.password) {
      return null;
    }

    const isValidPassword = await verifyPassword(user.password, password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }
}
