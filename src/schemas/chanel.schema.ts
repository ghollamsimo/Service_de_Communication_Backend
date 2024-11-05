import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Channel extends Document {
    
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  members?:  mongoose.Schema.Types.ObjectId[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  moderators?:  mongoose.Schema.Types.ObjectId[];

  @Prop({ default: false })
  safeMode: boolean;

  @Prop([String])
  bannedWords?: string[];
}

export type ChannelDocument = Channel & Document;

export const ChannelSchema = SchemaFactory.createForClass(Channel);
