import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateRestaurantOwnerDto } from './dto/update-restaurant-owner.dto';
import { CreateRestaurantOwnerDto } from './dto/create-restaurant-owner.dto';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/token/userId.decorator';
import { idDto } from 'src/dto/id-dto';
import { Roles } from 'src/role/guard/roles.decorator';
import { Role } from 'src/role/guard/role.enum';

@Controller('restaurantOwner')
export class RestaurantOwnerController {
  constructor(
    private readonly restaurantOwnerService: RestaurantOwnerService,
  ) {}

  @ApiTags('Restaurant Owner')
  @Roles(Role.RESTAURANT_OWNER)
  @Post()
  async createRestaurantOwner(
    @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto,
  ) {
    return await this.restaurantOwnerService.createRestaurantOwner(
      createRestaurantOwnerDto,
    );
  }

  @ApiTags('Restaurant Owner')
  @Roles(Role.RESTAURANT_OWNER)
  @Put('/:id')
  async updateRestaurantOwner(
    @Param() userId: idDto,
    @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ) {
    return await this.restaurantOwnerService.updateRestaurantOwner(
      userId.id,
      updateRestaurantOwnerDto,
    );
  }

  @ApiTags('Restaurant Owner')
  @Roles(Role.RESTAURANT_OWNER)
  @Delete('/:id')
  async deleteRestaurantOwner(@Param() restaurantOwnerId: idDto) {
    return await this.restaurantOwnerService.deleteRestaurantOwner(
      restaurantOwnerId.id,
    );
  }

  @ApiTags('Restaurant Owner')
  @Roles(Role.RESTAURANT_OWNER)
  @Get('byuser/:id')
  async getRestaurantOwners(@UserId() userId: string) {
    return await this.restaurantOwnerService.getRestaurantOwners(userId);
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get()
  async getAllRestaurantOwners() {
    return await this.restaurantOwnerService.getAllRestaurantOwners();
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get('/:id')
  async getRestaurantOwner(@Param() restaurantOwnerId: idDto) {
    return this.restaurantOwnerService.getRestaurantOwnersById(
      restaurantOwnerId.id,
    );
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get('admin/byrestaurant/:id')
  async getRestaurantUsers(@Param() restaurantId: idDto) {
    return await this.restaurantOwnerService.getRestaurantUsers(
      restaurantId.id,
    );
  }
}
