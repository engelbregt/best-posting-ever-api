import { InputType, Field } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

@InputType()
export class ContentDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  body?: string; // body is optional in Entity so I made it optional in DTO

  @IsArray()
  @IsOptional()
  @Type(() => String)
  @ValidateNested({ each: true })
  @Field(() => [String], { nullable: true })
  tags?: string[];

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  image?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  title?: string;
}
