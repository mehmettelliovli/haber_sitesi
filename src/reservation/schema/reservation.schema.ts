import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { AbstractDocument } from 'src/abstractRepository/abstract.document';

@Schema()
export class Reservation extends AbstractDocument {
  @Prop({ required: true })
  @IsMongoId()
  restaurantId: string;

  @Prop({ required: true })
  @IsMongoId()
  userId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  partySize: number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
