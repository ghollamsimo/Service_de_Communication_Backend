import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Channel extends Document {
    
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop([String])
  members?: string[];

  @Prop([String])
  moderators?: string[];

  @Prop({ default: false })
  safeMode: boolean;

  @Prop([String])
  bannedWords?: string[];
}

export type ChannelDocument = Channel & Document;

export const ChannelSchema = SchemaFactory.createForClass(Channel);
