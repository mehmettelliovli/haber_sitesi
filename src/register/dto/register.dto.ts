import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthWithoutUserIdDto } from './auth-without-user-id.dto';

export class RegisterDto {
  @ValidateNested()
  @Type(() => CreateUserDto)
  @ApiProperty({ type: CreateUserDto })
  user: CreateUserDto;

  @ValidateNested()
  @Type(() => AuthWithoutUserIdDto)
  @ApiProperty({ type: AuthWithoutUserIdDto })
  auth: AuthWithoutUserIdDto;
}
