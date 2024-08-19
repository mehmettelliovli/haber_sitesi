import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleRepository } from './user-role.repository';
import { CustomResponse } from 'src/responses/custom-responses';
import { CustomException } from 'src/exceptions/custom-exception';
import { ResponseMessages } from 'src/responses/response-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { UserRole } from './schema/user-role.schema';
import { IResult } from './interface/result.interface';


@Injectable()
export class UserRoleService {
  constructor(private userRoleRepository: UserRoleRepository) {}

  async createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<IResult<UserRole>> {
    try {
      const userRole = await this.userRoleRepository.create({
        ...createUserRoleDto,
      });
      return CustomResponse(
        ResponseMessages.USER_ROLE_CREATED,
        ResponseCodes.USER_ROLE_CREATED,
        userRole,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.USER_ROLE_CREATION_FAILED,
        ErrorMessages.USER_ROLE_CREATION_FAILED,
        404,
      );
    }
  }

  async findAllUserRole() {
    try {
      const allUserRole = await this.userRoleRepository.find();
      return CustomResponse(
        ResponseMessages.USER_ROLE_FOUND,
        ResponseCodes.USER_ROLE_FOUND,
        allUserRole,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESOURCE_NOT_FOUND,
        ErrorMessages.RESOURCE_NOT_FOUND,
        404,
      );
    }
  }

  async updateUserRole(
    userId: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<IResult<UserRole>> {
    try {
      const userRole = await this.userRoleRepository.findOneAndUpdate(
        { _id: userId },
        { ...updateUserRoleDto },
      );
      if (!userRole) {
        throw new CustomException(
          ErrorCodes.USER_ROLE_NOT_FOUND,
          ErrorMessages.USER_ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_ROLE_UPDATED,
        ResponseCodes.USER_ROLE_UPDATED,
        userRole,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteUserRole(userId: string): Promise<IResult<UserRole>> {
    try {
      const userRole = await this.userRoleRepository.findOneAndDelete({
        _id: userId,
      });
      if (!userRole) {
        throw new CustomException(
          ErrorCodes.USER_ROLE_NOT_FOUND,
          ErrorMessages.USER_ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_ROLE_DELETED,
        ResponseCodes.USER_ROLE_DELETED,
        userRole,
      );
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<IResult<UserRole>> {
    try {
      const userRole = await this.userRoleRepository.findById(id);
      if (!userRole) {
        throw new CustomException(
          ErrorCodes.USER_ROLE_NOT_FOUND,
          ErrorMessages.USER_ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_ROLE_FOUND,
        ResponseCodes.USER_ROLE_FOUND,
        userRole,
      );
    } catch (err) {
      throw err;
    }
  }
  async getUserRoles(userId: string) {
    try {
      const userRole = await this.userRoleRepository.find(
        { userId: userId },
        'role -_id',
      );
      if (!userRole) {
        throw new CustomException(
          ErrorCodes.USER_ROLE_NOT_FOUND,
          ErrorMessages.USER_ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.USER_ROLE_FOUND,
        ResponseCodes.USER_ROLE_FOUND,
        userRole,
      );
    } catch (err) {
      throw err;
    }
  }
}
