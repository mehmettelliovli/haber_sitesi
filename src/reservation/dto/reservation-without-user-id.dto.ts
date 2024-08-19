import { OmitType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';

export class ReservationWithoutUserIdDto extends OmitType(
  CreateReservationDto,
  ['userId'] as const,
) {}
