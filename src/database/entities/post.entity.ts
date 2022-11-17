import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinTable } from 'typeorm';

import { SyncEntity } from './sync.entity';

import { POSTS_ENTITY_NAME } from 'utils/constants';

@Entity(POSTS_ENTITY_NAME)
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAtTime: number;

  @Column({ type: 'char', length: 48, nullable: false })
  ownerId: string;

  @Column({ type: 'varchar', nullable: false })
  spaceId: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  tags?: string[];

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', nullable: true })
  syncBlockId?: string;

  @Column({ type: 'varchar', nullable: true })
  syncContentId?: string;

  @ManyToOne(() => SyncEntity, { eager: true })
  @JoinTable()
  syncBlock: SyncEntity;
}
