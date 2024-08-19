import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleService } from './user-role.service';
import { ApiTags } from '@nestjs/swagger';
import { idDto } from 'src/dto/id-dto';
import { Roles } from 'src/role/guard/roles.decorator';
import { Role } from 'src/role/guard/role.enum';

@Controller('UserRole')
@ApiTags('Admin')
@Roles(Role.ADMIN)
export class UserRoleController {
  constructor(private readonly UserRoleService: UserRoleService) {}

  @Post()
  async createUserRole(@Body() createUserRoleDto: CreateUserRoleDto) {
    const newUserRole =
      await this.UserRoleService.createUserRole(createUserRoleDto);
    return newUserRole;
  }

  @Put('/:id')
  async updateUserRole(
    @Param() userId: idDto,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return await this.UserRoleService.updateUserRole(
      userId.id,
      updateUserRoleDto,
    );
  }

  @Get()
  async getAllUserRoles() {
    return await this.UserRoleService.findAllUserRole();
  }

  @Get('/:id')
  async getUserRole(@Param() UserRoleId: idDto) {
    return await this.UserRoleService.findById(UserRoleId.id);
  }

  @Get('userId/:id')
  async getUserRoles(@Param() UserId: idDto) {
    return await this.UserRoleService.getUserRoles(UserId.id);
  }

  @Delete('/:id')
  async deleteUserRole(@Param() UserRoleId: idDto) {
    return await this.UserRoleService.deleteUserRole(UserRoleId.id);
  }
}
