import { MessageEntity } from "src/entities/message.entity";
import { MessageDocument } from "src/schemas/messages.schema";

export interface MessageInterface{
    create(messageEntity: MessageEntity): Promise<MessageDocument> 
    getMessages(id:string): Promise<MessageDocument[]> 
    delete(id: string): Promise<void>
}