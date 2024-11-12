import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


enum Status {
    Sent = 'sent',
    Readed = 'readed',
    Failed = 'faild',
  }

@Schema({ timestamps: true })

export class Message extends Document {

  @Prop({ type: mongoose.Types.ObjectId ,ref:"User", required: true })
  senderId: string; 
  
  @Prop({ type: mongoose.Types.ObjectId ,ref:"Channel", required: true })
  channelId: string; 

  @Prop({ type: String, required: true })
  content: string; 

  @Prop({ type: String, default: 'text' })
  type: string; 

  @Prop({ type: String, enum: Status, default: Status.Sent })
  status: Status;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
