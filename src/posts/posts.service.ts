import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { Repository } from 'typeorm';

import { PostEntity } from '../database/entities/post.entity';

import { IPFSService } from '../IPFS/IPFS.service';
import { SyncService } from '../sync/sync.service';

import { PostDto } from './dto/post.dto';
import { SyncDto } from '../sync/dto/sync.dto';

import { IPFS_SYNC_FREQUENCY } from 'utils/constants';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    private readonly IPFSService: IPFSService,
    private readonly syncService: SyncService,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) { }

  onModuleInit() {
    this.IPFSSync();
  }

  findAll(): Promise<PostEntity[]> {
    try {
      return this.postRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async create(postDto: PostDto): Promise<PostEntity | null> {
    try {
      const { spaceId, ownerId, content } = postDto;
      const { body, tags, image, title } = content;

      const post = this.postRepository.create({ ownerId, spaceId, body, tags, image, title });

      const result = await this.postRepository.save(post);

      if (!result) return null;

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Cron(IPFS_SYNC_FREQUENCY)
  async IPFSSync(): Promise<void> {
    const posts = await this.findAll();

    if (!posts.length) return;

    const IdPostMap = posts.reduce((accum, post) => {
      accum.set(post.id, post);

      return accum;
    }, new Map<number, PostEntity>());

    const IPFSBackup = this.IPFSService.addItems(
      posts.map((post) => {
        return { name: post.id.toString(), content: JSON.stringify(post) };
      }),
    );

    const currentBlockId = await this.IPFSService.getCurrentBlockId();

    for await (const IPFSBackupResult of IPFSBackup) {
      const { path, cid } = IPFSBackupResult;

      if (path) {
        const post = IdPostMap.get(+path);

        post.syncBlockId = currentBlockId;
        post.syncContentId = cid.toString();

        IdPostMap.set(+path, post);
      } else {
        const syncDto: SyncDto = { id: currentBlockId, backupDirectoryCid: cid.toString() };

        this.syncService.sync(syncDto);
      }
    }

    for (const [, post] of IdPostMap) {
      this.postRepository.save(post);
    }
  }
}
