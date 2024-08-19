import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schema/user.schema';
import { IResult } from './interface/result.interface';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ResponseMessages } from 'src/responses/response-messages';
import { CustomResponse } from 'src/responses/custom-responses';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<IResult<User>> {
    try {
      const user = await this.userRepository.create({ ...createUserDto });
      return CustomResponse(
        ResponseMessages.USER_CREATED,
        ResponseCodes.USER_CREATED,
        user,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.USER_CREATION_FAILED,
        ErrorMessages.USER_CREATION_FAILED,
        404,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return CustomResponse(
        ResponseMessages.USER_FOUND,
        ResponseCodes.USER_FOUND,
        users,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESOURCE_NOT_FOUND,
        ErrorMessages.RESOURCE_NOT_FOUND,
        404,
      );
    }
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IResult<User>> {
    try {
      const user = await this.userRepository.findOneAndUpdate(
        { _id: userId },
        { ...updateUserDto },
      );
      if (!user) {
        throw new CustomException(
          ErrorCodes.USER_NOT_FOUND,
          ErrorMessages.USER_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_UPDATED,
        ResponseCodes.USER_UPDATED,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(userId: string): Promise<IResult<User>> {
    try {
      const user = await this.userRepository.findOneAndDelete({ _id: userId });
      if (!user) {
        throw new CustomException(
          ErrorCodes.USER_NOT_FOUND,
          ErrorMessages.USER_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_DELETED,
        ResponseCodes.USER_DELETED,
        user,
      );
    } catch (err) {
      throw err;
    }
  }
  async findByEmail(email: string) {
    try {
      const existingEmail = await this.userRepository.findOne({ email: email });
      if (!existingEmail) {
        throw new CustomException(40111, `Email #${email} not found`, 401);
      }
      return CustomResponse('Email found', 32321, existingEmail);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<IResult<User>> {
    try {
      const user = await this.userRepository.findById(id);
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
}
