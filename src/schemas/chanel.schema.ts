import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum ChannelType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  DM = 'dm',
}

@Schema({ timestamps: true })
export class Channel extends Document {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: true, enum: ChannelType })
  type: ChannelType;

  @Prop([
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['owner', 'moderator', 'member'], default: 'member' },
    },
  ])
  members?: { userId: mongoose.Schema.Types.ObjectId; role: string }[];

  @Prop({ default: false })
  safeMode: boolean;

  @Prop([String])
  bannedWords?: string[];

  @Prop({ type: String, enum: ['public', 'Archived'], default: 'public' })
  status: string;
}

export type ChannelDocument = Channel & Document;
export const ChannelSchema = SchemaFactory.createForClass(Channel);
