import { MessageEntity } from 'src/entities/message.entity';
import { Message, MessageDocument } from 'src/schemas/messages.schema';
import { MessageInterface } from '../interfaces/message.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MessageImplementation implements MessageInterface{

    constructor(@InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>) { }
    
    async create(messageEntity: MessageEntity): Promise<MessageDocument> {
        console.log(messageEntity);
        
        const message =  new this.MessageModel(messageEntity)
        console.log(message);
        
        return message.save()
    }
    async delete(id: string): Promise<void> {
        await this.MessageModel.findByIdAndDelete(id).exec();
    }
}