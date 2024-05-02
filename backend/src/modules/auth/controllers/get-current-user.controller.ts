import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from '../../../common/guards/jwt.guard';
import { JwtToken } from '../types';
import { UserNotFoundError } from '../../../common/errors/user-not-found';

@Controller()
export class GetCurrentUserController {
  constructor(private prisma: PrismaService) {}

  @Get('/auth/get-current-user')
  @UseGuards(JwtAuthGuard)
  async register(@Req() req: Request): Promise<Partial<User>> {
    const token = req.user as JwtToken;

    const user = await this.prisma.user.findFirst({
      where: { id: token.userId },
      select: {
        username: true,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
