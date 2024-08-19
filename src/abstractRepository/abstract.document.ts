import { Schema } from '@nestjs/mongoose';

@Schema()
export class AbstractDocument<T = any> {
  _id: T;
}
