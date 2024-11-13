import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "src/controllers/message.controller";
import { MessageImplementation } from "src/repository/implementations/message.implementation";
import { Message, MessageSchema } from "src/schemas/messages.schema";
import { User, UserModelSchema } from "src/schemas/user.schema";
import { MessageService } from "src/services/message.service";



@Module(
    {
        imports:[
            MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
            MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }])

        ],
        controllers:[MessageController],
        providers:[MessageService,MessageImplementation],
        exports:[MessageImplementation]
    }
)
export class MessagesModule{}