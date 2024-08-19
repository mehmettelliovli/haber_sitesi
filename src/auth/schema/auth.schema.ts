import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/abstractRepository/abstract.document';

@Schema()
export class Auth extends AbstractDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true})
  @IsMongoId()
  userId: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
