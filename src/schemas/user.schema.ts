import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: number;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    friends?: mongoose.Schema.Types.ObjectId[];
}

export type UserDocument = User & Document;

export const UserModelSchema = SchemaFactory.createForClass(User);

UserModelSchema.index({ email: 1 }, { unique: true });
