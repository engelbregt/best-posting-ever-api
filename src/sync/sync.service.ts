import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SyncEntity } from '../database/entities/sync.entity';

import { SyncDto } from './dto/sync.dto';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(SyncEntity)
    private readonly syncRepository: Repository<SyncEntity>,
  ) {}

  async sync(syncDto: SyncDto): Promise<SyncEntity | null> {
    try {
      const { id, backupDirectoryCid } = syncDto;

      const sync = this.syncRepository.create({ id: id, backupDirectoryCid });

      const result = await this.syncRepository.save(sync);

      if (!result) return null;

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
