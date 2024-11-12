import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Friend extends Document {
  @Prop({ required: true })
  requesterId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop({ default: "pending" })
  status: string;
}
export type FriendDocument = Friend & Document;

export const FriendSchema = SchemaFactory.createForClass(Friend);
