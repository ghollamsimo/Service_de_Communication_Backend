import { Channel, ChannelDocument } from 'src/schemas/chanel.schema';
import { ChannelEntity } from "src/entities/chanel.entity";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChanelInetface } from '../interfaces/chanel.interface';




export  class ChanelImplementations implements  ChanelInetface{

    constructor(@InjectModel(Channel.name) private readonly chanelModel:Model<ChannelDocument> ){}

    getAllChanels(): Promise<ChannelDocument[]> {
        return ;
    }

    getChanelById(id: string): Promise<ChannelDocument> {
        return;
    }


    createChanel(ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        const  createdChanel = new this.chanelModel(ChannelEntity)
        return createdChanel.save();
    }


    updateChanel(id: string, ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        return this.chanelModel.findByIdAndUpdate(id, ChannelEntity, { new: true }).exec();
      }

    deleteChanel(ChannelEntity: ChannelEntity): Promise<{ msg: string; }> {
        return;
    }

}