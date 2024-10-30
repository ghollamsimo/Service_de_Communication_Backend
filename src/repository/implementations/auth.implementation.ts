import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { UserEntity } from '../../entities/user.entity';
import {AuthInterface} from "../interfaces/auth.interface";
import * as bcrypt from 'bcrypt';

export class AuthImplementation implements AuthInterface{
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    async register(userEntity: UserEntity): Promise<UserDocument> {
        const saltRounds = 10;

        userEntity.password = await bcrypt.hash(userEntity.password, saltRounds);

        const createdUser = new this.userModel(userEntity);
        return createdUser.save();
    }
}
