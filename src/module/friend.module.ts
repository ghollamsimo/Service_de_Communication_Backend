import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendController } from "src/controllers/friend.controller";
import { FriendSchema } from 'src/schemas/friend.schema';
import { FriendService } from "src/services/friend.service";
import {FrienImplementatins} from "../repository/implementations/friend.implementation"
import { User, UserModelSchema } from "src/schemas/user.schema";
import { ChannelSchema } from "src/schemas/chanel.schema";



@Module({

    imports:[
        MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
        MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),




    ],
    controllers:[FriendController],
    providers:[FriendService,FrienImplementatins],

}
)

export  class FriendModule {}