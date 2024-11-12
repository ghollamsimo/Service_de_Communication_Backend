import { MessageEntity } from "src/entities/message.entity";
import { MessageImplementation } from "src/repository/implementations/message.implementation";

export class MessageService{
    constructor(private readonly MessageImplementatio: MessageImplementation) { }
    creat(messageEntity: MessageEntity) {
        return this.MessageImplementatio.create(messageEntity)
    }

    delete(id: string) {
        return this.MessageImplementatio.delete(id)
    }
}