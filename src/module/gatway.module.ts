import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { WebRtcGateway } from "src/gateways/webrtc.gateway";
import { ChannelSchema } from "src/schemas/chanel.schema";
import { Message, MessageSchema } from "src/schemas/messages.schema";
import { User, UserModelSchema } from "src/schemas/user.schema";





@Module({
    imports:[
        MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
        MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),


    ],
    providers:[WebRtcGateway]
})

export class GatWaymodule{}