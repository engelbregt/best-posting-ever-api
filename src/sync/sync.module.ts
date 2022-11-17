import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SyncEntity } from '../database/entities/sync.entity';

import { SyncService } from './sync.service';

@Module({
  imports: [TypeOrmModule.forFeature([SyncEntity])],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
