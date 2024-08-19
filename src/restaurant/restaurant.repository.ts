import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { Restaurant } from './schema/restaurant.schema';

@Injectable()
export class RestaurantRepository extends AbstractRepository<Restaurant> {
  constructor(
    @InjectModel(Restaurant.name) restaurantModel: Model<Restaurant>,
  ) {
    super(restaurantModel);
  }
}
