import { OmitType } from '@nestjs/swagger';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class AuthWithoutUserIdDto extends OmitType(CreateAuthDto, [
  'userId',
] as const) {}
