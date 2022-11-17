import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SyncModel {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  backupDirectoryCid: string;
}
