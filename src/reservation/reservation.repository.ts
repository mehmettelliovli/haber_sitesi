import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { Reservation } from './schema/reservation.schema';

@Injectable()
export class ReservationRepository extends AbstractRepository<Reservation> {
  constructor(
    @InjectModel(Reservation.name) reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
