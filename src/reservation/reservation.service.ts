import { Injectable } from '@nestjs/common';
import { UpdateReservationDto } from 'src/reservation/dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { IResult } from './interface/result.interface';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ResponseMessages } from 'src/responses/response-messages';
import { CustomResponse } from 'src/responses/custom-responses';
import { Reservation } from './schema/reservation.schema';
import { ReservationWithoutUserIdDto } from './dto/reservation-without-user-id.dto';
@Injectable()
export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async createReservation(
    reservationWithoutUserIdDto: ReservationWithoutUserIdDto,
    userId: string,
  ): Promise<IResult<Reservation>> {
    try {
      const reservationData = { ...reservationWithoutUserIdDto, userId };
      const overlap = await this.reservationRepository.findOne({
        $or: [
          {
            startDate: { $lte: reservationWithoutUserIdDto.endDate },
            endDate: { $gte: reservationWithoutUserIdDto.startDate },
          },
        ],
      });

      if (overlap) {
        throw new CustomException(
          ErrorCodes.RESERVATION_DATE_IS_NOT_EMPTY,
          ErrorMessages.RESERVATION_DATE_IS_NOT_EMPTY,
          404,
        );
      }

      const reservation =
        await this.reservationRepository.create(reservationData);
      return CustomResponse(
        ResponseMessages.RESERVATION_CREATED,
        ResponseCodes.RESERVATION_CREATED,
        reservation,
      );
    } catch (err) {
      return err;
    }
  }

  async updateReservation(
    reservationId: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<IResult<Reservation>> {
    try {
      const user = await this.reservationRepository.findOneAndUpdate(
        { _id: reservationId },
        { ...updateReservationDto },
      );
      if (!user) {
        throw new CustomException(
          ErrorCodes.RESERVATION_NOT_FOUND,
          ErrorMessages.RESERVATION_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESERVATION_UPDATED,
        ResponseCodes.RESERVATION_UPDATED,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllReservations(): Promise<IResult<Reservation[]>> {
    try {
      const allReservations = await this.reservationRepository.find();
      return CustomResponse(
        ResponseMessages.RESERVATION_FOUND,
        ResponseCodes.RESERVATION_FOUND,
        allReservations,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESOURCE_NOT_FOUND,
        ErrorMessages.RESOURCE_NOT_FOUND,
        404,
      );
    }
  }

  async getReservations(userId: string): Promise<IResult<Reservation[]>> {
    try {
      const allReservations = await this.reservationRepository.find({
        userId: userId,
      });
      return CustomResponse(
        ResponseMessages.RESERVATION_FOUND,
        ResponseCodes.RESERVATION_FOUND,
        allReservations,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.RESOURCE_NOT_FOUND,
        ErrorMessages.RESOURCE_NOT_FOUND,
        404,
      );
    }
  }

  async getReservation(reservationId: string): Promise<IResult<Reservation>> {
    try {
      const user = await this.reservationRepository.findById(reservationId);
      if (!user) {
        throw new CustomException(
          ErrorCodes.RESERVATION_NOT_FOUND,
          ErrorMessages.RESERVATION_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESERVATION_FOUND,
        ResponseCodes.RESERVATION_FOUND,
        user,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteReservation(
    reservationId: string,
  ): Promise<IResult<Reservation>> {
    try {
      const user = await this.reservationRepository.findOneAndDelete({
        _id: reservationId,
      });
      if (!user) {
        throw new CustomException(
          ErrorCodes.RESERVATION_NOT_FOUND,
          ErrorMessages.RESERVATION_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.RESERVATION_DELETED,
        ResponseCodes.RESERVATION_DELETED,
        user,
      );
    } catch (err) {
      throw err;
    }
  }
}
