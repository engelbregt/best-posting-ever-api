import { IsString, IsNotEmpty } from 'class-validator';

export class IPFSItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
