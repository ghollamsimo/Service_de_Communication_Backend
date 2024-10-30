import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    phone: number;
}

export const UserModelSchema = SchemaFactory.createForClass(User);
