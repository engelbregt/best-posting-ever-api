import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { POSTS_ENTITY_NAME } from '../../utils/constants';

@Entity(POSTS_ENTITY_NAME)
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
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
  syncedBlock?: string;

  @Column({ type: 'varchar', nullable: true })
  syncedContentId?: string;
}
