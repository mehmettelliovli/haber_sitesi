import { Document } from 'mongoose';

export interface IRestaurant extends Document {
  readonly name: string;
  readonly city: string;
  readonly phone: string;
  readonly capacity: number;
}
