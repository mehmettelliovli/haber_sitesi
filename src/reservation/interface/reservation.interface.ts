import { Document } from 'mongoose';

export interface IReservation extends Document {
  readonly userId: string;
  readonly restaurantId: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly partySize: number;
}
