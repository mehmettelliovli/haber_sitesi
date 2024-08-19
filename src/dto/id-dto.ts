import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class idDto {
  @IsMongoId()
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
