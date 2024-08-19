import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantOwnerDto {
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
}
