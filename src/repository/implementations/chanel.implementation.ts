import { Channel, ChannelDocument } from 'src/schemas/chanel.schema';
import { ChanelInetface } from '../../../dist/repository/interfaces/chanel.interface';
import { ChannelEntity } from 'dist/entities/chanel.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';




export  class ChanelImplementations implements  ChanelInetface{

    constructor(@InjectModel(Channel.name) private readonly chanelModel:Model<ChannelDocument> ){}

    getAllChanels(): Promise<ChannelDocument[]> {
        return ;
    }

    getChanelById(id: string): Promise<ChannelDocument> {
        return;
    }


    createChanel(ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        return;
    }


    updateChanel(ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        return;
    }

    deleteChanel(ChannelEntity: ChannelEntity): Promise<{ msg: string; }> {
        return;
    }

}