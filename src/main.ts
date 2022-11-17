import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { ApiModule } from './api.module';

import { HTTP_PORT } from 'utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get(HTTP_PORT);

  await app.listen(port);
}

bootstrap();
