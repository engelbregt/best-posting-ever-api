import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field(() => ID)
  id: string;

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
  syncedBlock?: string;

  @Field(() => String, { nullable: true })
  syncedContentId?: string;
}
