import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateReservationDto } from 'src/reservation/dto/update-reservation.dto';
import { ReservationService } from 'src/reservation/reservation.service';
import { EmailService } from './email.service';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { idDto } from 'src/dto/id-dto';
import { UserId } from 'src/token/userId.decorator';
import { Roles } from 'src/role/guard/roles.decorator';
import { Role } from 'src/role/guard/role.enum';
import { ReservationWithoutUserIdDto } from './dto/reservation-without-user-id.dto';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('Reservation')
  @Roles(Role.USER)
  @Post()
  async createReservation(
    @Body() reservationWithoutUserIdDto: ReservationWithoutUserIdDto,
    @UserId() userId: string,
  ) {
    return await this.reservationService.createReservation(
      reservationWithoutUserIdDto,
      userId,
    );
  }

  @ApiTags('Reservation')
  @Roles(Role.USER)
  @Put('/:id')
  async updateReservation(
    @Param() reservationId: idDto,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return await this.reservationService.updateReservation(
      reservationId.id,
      updateReservationDto,
    );
  }

  @ApiTags('Reservation')
  @Roles(Role.USER)
  @Delete('/:id')
  async deleteReservation(@Param() reservationId: idDto) {
    return await this.reservationService.deleteReservation(reservationId.id);
  }

  @ApiTags('Reservation')
  @Roles(Role.USER)
  @Get('byUser/:id')
  async getReservations(@UserId() userId: string) {
    return await this.reservationService.getReservations(userId);
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get()
  async getAllReservations() {
    return await this.reservationService.getAllReservations();
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get('/:id')
  async getReservation(@Param() reservationId: idDto) {
    return await this.reservationService.getReservation(reservationId.id);
  }
}
