import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/abstractRepository/abstract.document';

@Schema()
export class Restaurant extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  capacity: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
