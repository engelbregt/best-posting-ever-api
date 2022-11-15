import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostEntity } from './entities/post.entity';

import { POSTGRES, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DATABASE } from 'utils/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: POSTGRES,
        host: configService.get(POSTGRES_HOST),
        port: configService.get(POSTGRES_PORT),
        username: configService.get(POSTGRES_USERNAME),
        password: configService.get(POSTGRES_PASSWORD),
        database: configService.get(POSTGRES_DATABASE),
        entities: [PostEntity],
        synchronize: true, // shouldn't be used in production but this api is too cool to follow the rules
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
