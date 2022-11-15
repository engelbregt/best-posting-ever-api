import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

import validate from './config/validate';

@Module({
  imports: [PostsModule, DatabaseModule, ConfigModule.forRoot({ validate, isGlobal: true })],
})
export class AppModule {}
