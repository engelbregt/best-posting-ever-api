import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { IPFSModule } from './IPFS/IPFS.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';

import validate from './config/validate';

@Module({
  imports: [
    IPFSModule,
    PostsModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ validate, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
})
export class ApiModule {}
