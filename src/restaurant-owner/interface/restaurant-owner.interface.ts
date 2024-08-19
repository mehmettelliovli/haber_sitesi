import { Document } from 'mongoose';
import { Reservation } from 'src/reservation/schema/reservation.schema';
import { User } from 'src/user/schema/user.schema';
import { Types } from 'mongoose';

export interface IRestaurantOwner extends Document {
  readonly userId: string | User;
  readonly restaurantId: string | Reservation;
}
