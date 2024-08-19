import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { AbstractDocument } from 'src/abstractRepository/abstract.document';

@Schema()
export class UserRole extends AbstractDocument {
  @Prop({ required: true })
  @IsMongoId()
  userId: string;

  @Prop({ required: true })
  role: number;
}

export const userRoleSchema = SchemaFactory.createForClass(UserRole);
