import { Injectable } from '@nestjs/common';
import { CreateRestaurantOwnerDto } from './dto/create-restaurant-owner.dto';
import { UpdateRestaurantOwnerDto } from './dto/update-restaurant-owner.dto';
import { RestaurantOwnerRepository } from './restaurant-owner.repository';
import { RestaurantOwner } from './schema/restaurant-owner.schema';
import { IResult } from './interface/result.interface';
import { CustomResponse } from 'src/responses/custom-responses';
import { ResponseMessages } from 'src/responses/response-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';

@Injectable()
export class RestaurantOwnerService {
  constructor(private restaurantOwnerRepository: RestaurantOwnerRepository) {}

  async createRestaurantOwner(
    createRestaurantOwnerDto: CreateRestaurantOwnerDto,
  ): Promise<IResult<RestaurantOwner>> {
    try {
      const restaurantOwner = await this.restaurantOwnerRepository.create({
        ...createRestaurantOwnerDto,
      });
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_CREATED,
        ResponseCodes.USER_RESTAURANT_CREATED,
        restaurantOwner,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.USER_RESTAURANT_CREATION_FAILED,
        ErrorMessages.USER_RESTAURANT_CREATION_FAILED,
        404,
      );
    }
  }

  async updateRestaurantOwner(
    restaurantOwnerId: string,
    updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ): Promise<IResult<RestaurantOwner>> {
    try {
      const restaurantOwner =
        await this.restaurantOwnerRepository.findOneAndUpdate(
          { _id: restaurantOwnerId },
          { ...updateRestaurantOwnerDto },
        );
      if (!restaurantOwner) {
        throw new CustomException(
          ErrorCodes.USER_RESTAURANT_NOT_FOUND,
          ErrorMessages.USER_RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_UPDATED,
        ResponseCodes.USER_RESTAURANT_UPDATED,
        restaurantOwner,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteRestaurantOwner(
    restaurantOwnerId: string,
  ): Promise<IResult<RestaurantOwner>> {
    try {
      const restaurantOwner =
        await this.restaurantOwnerRepository.findOneAndDelete({
          _id: restaurantOwnerId,
        });
      if (!restaurantOwner) {
        throw new CustomException(
          ErrorCodes.USER_RESTAURANT_NOT_FOUND,
          ErrorMessages.USER_RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_DELETED,
        ResponseCodes.USER_RESTAURANT_DELETED,
        restaurantOwner,
      );
    } catch (err) {
      throw err;
    }
  }
  async getRestaurantOwnersById(
    userId: string,
  ): Promise<IResult<RestaurantOwner[]>> {
    try {
      const user = await this.restaurantOwnerRepository.find({
        userId: userId,
      });
      if (!user) {
        throw new CustomException(
          ErrorCodes.USER_RESTAURANT_NOT_FOUND,
          ErrorMessages.USER_RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_FOUND,
        ResponseCodes.USER_RESTAURANT_FOUND,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async getRestaurantOwners(
    userId: string,
  ): Promise<IResult<RestaurantOwner[]>> {
    try {
      const user = await this.restaurantOwnerRepository.find({
        userId: userId,
      });
      if (!user) {
        throw new CustomException(
          ErrorCodes.USER_RESTAURANT_NOT_FOUND,
          ErrorMessages.USER_RESTAURANT_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_FOUND,
        ResponseCodes.USER_RESTAURANT_FOUND,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async getRestaurantUsers(
    restaurantId: string,
  ): Promise<IResult<RestaurantOwner[]>> {
    try {
      const user = await this.restaurantOwnerRepository.find({
        _id: restaurantId,
      });
      if (!user) {
        throw new CustomException(
          ErrorCodes.USER_NOT_FOUND,
          ErrorMessages.USER_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_FOUND,
        ResponseCodes.USER_FOUND,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllRestaurantOwners() {
    try {
      const allRestaurantOwners = await this.restaurantOwnerRepository.find();
      return CustomResponse(
        ResponseMessages.USER_RESTAURANT_FOUND,
        ResponseCodes.USER_RESTAURANT_FOUND,
        allRestaurantOwners,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.USER_RESTAURANT_NOT_FOUND,
        ErrorMessages.USER_RESTAURANT_NOT_FOUND,
        404,
      );
    }
  }
  //RestaurantOwnerId: giris yapmis kullanici id si olacak
  //ve burada kullanicidan girdi alinmayacak giris yapan kullanicinin id si tokenden alinarak yapilacak
}
