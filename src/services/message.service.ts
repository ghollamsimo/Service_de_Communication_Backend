import { Injectable } from "@nestjs/common";
import { MessageEntity } from "src/entities/message.entity";
import { MessageImplementation } from "src/repository/implementations/message.implementation";
import { MessageDocument } from "src/schemas/messages.schema";

@Injectable()
export class MessageService{
    constructor(
        private readonly MessageImplementatio: MessageImplementation
    ) { }
    creat(messageEntity: MessageEntity) {
        
        return this.MessageImplementatio.create(messageEntity)
    }

    delete(id: string) {
        return this.MessageImplementatio.delete(id)
    }

    getMessages(id: string): Promise<MessageDocument[]> {
        return this.MessageImplementatio.getMessages(id)
    }
}