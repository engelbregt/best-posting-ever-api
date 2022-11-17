import { ObjectType, Field, ID } from '@nestjs/graphql';

import { SyncModel } from '../../sync/models/sync.model';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: number;

  @Field(() => Number, { nullable: false })
  createdAtTime: number;

  @Field(() => String, { nullable: false })
  ownerId: string;

  @Field(() => String, { nullable: false })
  spaceId: string;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  syncBlockId?: string;

  @Field(() => String, { nullable: true })
  syncContentId?: string;

  @Field(() => SyncModel, { nullable: true })
  syncBlock?: SyncModel;
}
