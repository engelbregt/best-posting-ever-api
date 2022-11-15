import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

import validate from './config/validate';

@Module({
  imports: [
    PostsModule,
    DatabaseModule,
    ConfigModule.forRoot({ validate, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule {}
