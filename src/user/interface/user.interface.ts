import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly lastName: string;
  readonly phone: string;
  readonly email: string;
}
