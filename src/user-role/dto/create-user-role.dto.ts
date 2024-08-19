import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  role: number;
}
