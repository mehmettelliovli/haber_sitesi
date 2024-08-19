import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant.dto';
import { RestaurantRepository } from './restaurant.repository';
import { IResult } from './interface/result.interface';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ResponseMessages } from 'src/responses/response-messages';
import { CustomResponse } from 'src/responses/custom-responses';
import { Restaurant } from './schema/restaurant.schema';

@Injectable()
export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<IResult<Restaurant>> {
    try {
      const restaurant =
        await this.restaurantRepository.create(createRestaurantDto);
      return CustomResponse(
        ResponseMessages.RESTAURANT_CREATED,
        ResponseCodes.RESTAURANT_CREATED,
        restaurant,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESTAURANT_CREATION_FAILED,
        ErrorMessages.RESTAURANT_CREATION_FAILED,
        404,
      );
    }
  }

  async updateRestaurant(
    restaurantId: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<IResult<Restaurant>> {
    try {
      const restaurant = await this.restaurantRepository.findOneAndUpdate(
        { _id: restaurantId },
        { ...updateRestaurantDto },
      );
      if (!restaurant) {
        throw new CustomException(
          ErrorCodes.RESTAURANT_NOT_FOUND,
          ErrorMessages.RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESTAURANT_UPDATED,
        ResponseCodes.RESTAURANT_UPDATED,
        restaurant,
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllRestaurants(): Promise<IResult<Restaurant[]>> {
    try {
      const allRestaurants = await this.restaurantRepository.find();
      return CustomResponse(
        ResponseMessages.RESTAURANT_FOUND,
        ResponseCodes.RESTAURANT_FOUND,
        allRestaurants,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESTAURANT_NOT_FOUND,
        ErrorMessages.RESTAURANT_NOT_FOUND,
        404,
      );
    }
  }

  async getRestaurant(restaurantId: string): Promise<IResult<Restaurant>> {
    try {
      const restaurant = await this.restaurantRepository.findById(restaurantId);
      if (!restaurant) {
        throw new CustomException(
          ErrorCodes.RESTAURANT_NOT_FOUND,
          ErrorMessages.RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESTAURANT_FOUND,
        ResponseCodes.RESTAURANT_FOUND,
        restaurant,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteRestaurant(restaurantId: string): Promise<IResult<Restaurant>> {
    try {
      const restaurant = await this.restaurantRepository.findOneAndDelete({
        _id: restaurantId,
      });
      if (!restaurant) {
        throw new CustomException(
          ErrorCodes.RESTAURANT_NOT_FOUND,
          ErrorMessages.RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESTAURANT_DELETED,
        ResponseCodes.RESTAURANT_DELETED,
        restaurant,
      );
    } catch (err) {
      throw err;
    }
  }
}
