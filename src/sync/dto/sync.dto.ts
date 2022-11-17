import { IsString, IsNotEmpty } from 'class-validator';

export class SyncDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  backupDirectoryCid: string;
}
