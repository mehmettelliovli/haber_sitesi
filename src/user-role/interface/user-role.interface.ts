import { Document } from 'mongoose';

export interface IUserRole extends Document {
  readonly userId: string;
  readonly role: number;
}
