import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Friend extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  requesterId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  receiverId: string;

  @Prop({ type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
  status: string;
}

export type FriendDocument = Friend & Document;

export const FriendSchema = SchemaFactory.createForClass(Friend);
