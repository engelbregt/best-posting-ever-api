import { Entity, PrimaryColumn, Column } from 'typeorm';

import { SYNC_ENTITY_NAME } from 'utils/constants';

@Entity(SYNC_ENTITY_NAME)
export class SyncEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  backupDirectoryCid: string;
}
