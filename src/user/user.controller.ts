import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  //Post,
  Put,
  //UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { idDto } from 'src/dto/id-dto';
import { Roles } from 'src/role/guard/roles.decorator';
import { Role } from 'src/role/guard/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*@ApiTags('User')
  @Roles(Role.USER)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }*/

  @ApiTags('User')
  @Roles(Role.USER)
  @Put('/:id')
  async updateUser(
    @Param() userId: idDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId.id, updateUserDto);
  }

  @ApiTags('User')
  @Roles(Role.USER)
  @Delete('/:id')
  async deleteUser(@Param() userId: idDto) {
    return await this.userService.deleteUser(userId.id);
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get('/:id')
  async getUser(@Param() userId: idDto) {
    return await this.userService.findById(userId.id);
  }
}
