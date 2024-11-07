import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendController } from "src/controllers/friend.controller";
import { FriendSchema } from 'src/schemas/friend.schema';
import { FriendService } from "src/services/friend.service";
import {FrienImplementatins} from "../repository/implementations/friend.implementation"



@Module({

    imports:[
        MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }]),

    ],
    controllers:[FriendController],
    providers:[FriendService,FrienImplementatins],

}
)

export  class FriendModule {}