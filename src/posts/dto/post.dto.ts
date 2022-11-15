import { InputType, Field } from '@nestjs/graphql';

import { IsString, Length, IsNotEmpty } from 'class-validator';

import { ContentDto } from './content.dto';

@InputType()
export class PostDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  spaceId: string;

  @Length(48)
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  ownerId: string;

  @IsNotEmpty()
  @Field(() => ContentDto, { nullable: false })
  content: ContentDto;
}
