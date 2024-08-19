import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { ResponseMessages } from 'src/responses/response-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { CustomResponse } from 'src/responses/custom-responses';
import { CustomException } from 'src/exceptions/custom-exception';
import { Role } from './schema/role.schema';
import { IResult } from './interface/result.interface';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(createRoleDto);
      return CustomResponse(
        ResponseMessages.ROLE_CREATED,
        ResponseCodes.ROLE_CREATED,
        role,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.ROLE_CREATION_FAILED,
        ErrorMessages.ROLE_CREATION_FAILED,
        404,
      );
    }
  }

  async updateRole(
    roleId: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<IResult<Role>> {
    try {
      const role = await this.roleRepository.findOneAndUpdate(
        { _id: roleId.toString() },
        { ...updateRoleDto },
      );
      if (!role) {
        throw new CustomException(
          ErrorCodes.ROLE_NOT_FOUND,
          ErrorMessages.ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.ROLE_UPDATED,
        ResponseCodes.ROLE_UPDATED,
        role,
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllRoles(): Promise<IResult<Role[]>> {
    try {
      const allRoles = await this.roleRepository.find();
      return CustomResponse(
        ResponseMessages.ROLE_FOUND,
        ResponseCodes.ROLE_FOUND,
        allRoles,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESOURCE_NOT_FOUND,
        ErrorMessages.RESOURCE_NOT_FOUND,
        404,
      );
    }
  }

  async getRole(roleId: number): Promise<IResult<Role>> {
    try {
      const role = await this.roleRepository.findById(roleId.toString());
      if (!role) {
        throw new CustomException(
          ErrorCodes.ROLE_NOT_FOUND,
          ErrorMessages.ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.ROLE_FOUND,
        ResponseCodes.ROLE_FOUND,
        role,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteRole(roleId: number): Promise<IResult<Role>> {
    try {
      const role = await this.roleRepository.findOneAndDelete({
        _id: roleId.toString(),
      });
      if (!role) {
        throw new CustomException(
          ErrorCodes.ROLE_NOT_FOUND,
          ErrorMessages.ROLE_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.ROLE_DELETED,
        ResponseCodes.ROLE_DELETED,
        role,
      );
    } catch (err) {
      throw err;
    }
  }
}
