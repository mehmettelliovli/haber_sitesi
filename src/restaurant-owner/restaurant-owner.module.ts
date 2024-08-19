import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantOwnerSchema } from './schema/restaurant-owner.schema';
import { RestaurantOwnerController } from './restaurant-owner.controller';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { RestaurantOwnerRepository } from './restaurant-owner.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RestaurantOwner', schema: RestaurantOwnerSchema },
    ]),
  ],
  controllers: [RestaurantOwnerController],
  providers: [RestaurantOwnerService, RestaurantOwnerRepository],
  exports: [RestaurantOwnerService],
})
export class RestaurantOwnerModule {}
