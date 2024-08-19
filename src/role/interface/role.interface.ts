import { Document } from 'mongoose';

export interface IRole extends Document {
  readonly _id: number;
  readonly roleName: string;
}
