import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class Schema {
  @IsNumber()
  @IsNotEmpty()
  HTTP_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  IPFS_AUTH_HEADER: string;
}
