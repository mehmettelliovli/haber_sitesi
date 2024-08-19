import { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export interface IAuth extends Document {
  readonly email: string;
  readonly password: string;
  readonly userId: string | User;
}