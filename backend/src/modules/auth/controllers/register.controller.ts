import { Body, Controller, Post } from '@nestjs/common';
import { RegisterInputDto } from '../dtos/register-input.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPasswordHash } from '../password';
import { UserAlreadyExistsError } from '../../../common/errors/user-already-exists';

@Controller()
export class RegisterController {
  constructor(private prisma: PrismaService) {}

  @Post('/auth/register')
  async register(@Body() input: RegisterInputDto) {
    const user = await this.prisma.user.findFirst({
      where: { username: input.username },
    });

    if (user) {
      throw new UserAlreadyExistsError();
    }

    await this.prisma.user.create({
      data: {
        username: input.username,
        password: await getPasswordHash(input.password),
      },
    });
  }
}
