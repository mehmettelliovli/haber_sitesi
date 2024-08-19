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
import { idDto } from 'src/dto/id-dto';
import { CreateRestaurantDto } from 'src/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Role } from 'src/role/guard/role.enum';
import { Roles } from 'src/role/guard/roles.decorator';

@Controller('restaurant')
@Roles(Role.ADMIN)
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiTags('Admin')
  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return await this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @ApiTags('Admin')
  @Put('/:id')
  async updateRestaurant(
    @Param() restaurantId: idDto,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.updateRestaurant(
      restaurantId.id,
      updateRestaurantDto,
    );
  }

  @ApiTags('Restaurant')
  @Get()
  async getRestaurants() {
    return await this.restaurantService.getAllRestaurants();
  }

  @ApiTags('Admin')
  @Get('/:id')
  async getRestaurant(@Param() restaurantId: idDto) {
    return await this.restaurantService.getRestaurant(restaurantId.id);
  }

  @ApiTags('Admin')
  @Delete('/:id')
  async deleteRestaurant(@Param() restaurantId: idDto) {
    return await this.restaurantService.deleteRestaurant(restaurantId.id);
  }
}
