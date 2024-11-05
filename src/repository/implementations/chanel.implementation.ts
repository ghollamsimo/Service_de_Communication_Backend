import { Channel, ChannelDocument } from 'src/schemas/chanel.schema';
import { ChannelEntity } from "src/entities/chanel.entity";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChanelInetface } from '../interfaces/chanel.interface';
import { ForbiddenException, NotFoundException } from '@nestjs/common';




export  class ChanelImplementations implements  ChanelInetface{

    constructor(@InjectModel(Channel.name) private readonly chanelModel:Model<ChannelDocument> ){}

    getAllChanels(): Promise<ChannelDocument[]> {
        return this.chanelModel.find().exec();
    }

    getChanelById(id: string): Promise<ChannelDocument> {
        return this.chanelModel.findById(id).exec()
    }


    createChanel(ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        const  createdChanel = new this.chanelModel(ChannelEntity)
        return createdChanel.save();
    }


   async updateChanel(id: string, ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
        const channel = await this.chanelModel.findById(id).exec();
        
            if (!channel) {
            throw new NotFoundException('Channel not found');
            }
    if (channel.ownerId.toString() !== ChannelEntity.ownerId) {
        throw new ForbiddenException('You do not have permission to update this channel');
      }
        
        return this.chanelModel.findByIdAndUpdate(id, ChannelEntity, { new: true }).exec();
      }

      async deleteChanel(id: string,ownerId:string): Promise<{ msg: string }> {
        const channel = await this.chanelModel.findById(id).exec();
        
        if (!channel) {
        throw new NotFoundException('Channel not found');
                }
        if (channel.ownerId && channel.ownerId.toString() !== ownerId) {
            throw new ForbiddenException('You do not have permission to delete this channel');
        }
        
        const deletedChanel = await this.chanelModel.findByIdAndDelete(id).exec();
        if (!deletedChanel) {
            throw new NotFoundException('There is no channel with that id');
        }
        return { msg: 'Channel deleted' }; 
    }

}