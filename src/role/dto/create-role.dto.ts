import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly _id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly roleName: string;
}
