import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Project } from './project.schema';

export type ProjectCollectionDocument = ProjectCollection & Document;

@Schema()
export class ProjectCollection {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, minlength: 10, maxlength: 300 })
  tags: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Project' })
  project: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: string;
}

export const ProjectCollectionSchema =
  SchemaFactory.createForClass(ProjectCollection);
