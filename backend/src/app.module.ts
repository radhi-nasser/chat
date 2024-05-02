import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ChatGateway } from './modules/chat/chat.gateway';
import { AuthModule } from './modules/auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // enforces env variables to exist to launch the server
      // https://docs.nestjs.com/techniques/configuration#schema-validation
      validationSchema: validateEnvironmentVariablesSchema(),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService, ChatGateway],
})
export class AppModule {}

function validateEnvironmentVariablesSchema() {
  return Joi.object({
    FRONTEND_URL: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  });
}
