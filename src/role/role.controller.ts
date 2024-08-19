import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { UpdateRoleDto } from 'src/role/dto/update-role.dto';
import { RoleService } from 'src/role/role.service';
import { Roles } from './guard/roles.decorator';
import { Role } from './guard/role.enum';

@Controller('role')
@ApiTags('Admin')
@Roles(Role.ADMIN)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRole(createRoleDto);
  }

  @Put('/:id')
  async updateRole(
    @Param('id') roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.updateRole(roleId, updateRoleDto);
  }

  @Get()
  async getRoles() {
    return await this.roleService.getAllRoles();
  }

  @Get('/:id')
  async getRole(@Param('id') roleId: number) {
    return await this.roleService.getRole(roleId);
  }

  @Delete('/:id')
  async deleteRole(@Param('id') roleId: number) {
    return await this.roleService.deleteRole(roleId);
  }
}
