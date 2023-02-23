import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  admin = 'admin',
  user = 'user',
  moderator = 'moderator',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, trim: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ default: Role.user })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
