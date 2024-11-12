import { MessageEntity } from 'src/entities/message.entity';
import { Message, MessageDocument } from 'src/schemas/messages.schema';
import { MessageInterface } from '../interfaces/message.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MessageImplementation implements MessageInterface{
    constructor(@InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>) { }
    
    create(messageEntity: MessageEntity): Promise<MessageDocument> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

}