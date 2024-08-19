import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { AbstractDocument } from 'src/abstractRepository/abstract.document';

@Schema()
export class RestaurantOwner extends AbstractDocument {
  @Prop({ required: true })
  @IsMongoId()
  userId: string;

  @Prop({ required: true })
  @IsMongoId()
  restaurantId: string;
}

export const RestaurantOwnerSchema =
  SchemaFactory.createForClass(RestaurantOwner);
