import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '../database/entities/post.entity';

import { IPFSModule } from '../IPFS/IPFS.module';
import { SyncModule } from '../sync/sync.module';

import { PostsResolver } from './posts.resolver';

import { PostsService } from './posts.service';

@Module({
  imports: [IPFSModule, SyncModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
