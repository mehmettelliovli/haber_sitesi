import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsMongoId()
  restaurantId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  startDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  endDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  partySize: number;
}
