import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { RestaurantOwner } from './schema/restaurant-owner.schema';

@Injectable()
export class RestaurantOwnerRepository extends AbstractRepository<RestaurantOwner> {
  constructor(
    @InjectModel(RestaurantOwner.name)
    restaurantOwnerModel: Model<RestaurantOwner>,
  ) {
    super(restaurantOwnerModel);
  }
}
