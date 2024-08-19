import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  roleName: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
