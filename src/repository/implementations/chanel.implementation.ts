import { Channel, ChannelDocument } from 'src/schemas/chanel.schema';
import { ChannelEntity } from "src/entities/chanel.entity";
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ChanelInetface } from '../interfaces/chanel.interface';
import { NotFoundException } from '@nestjs/common';




export  class ChanelImplementations implements  ChanelInetface{

    constructor(@InjectModel(Channel.name) private readonly chanelModel:Model<ChannelDocument> ){}

    getAllChanels(): Promise<ChannelDocument[]> {
        return this.chanelModel.find().exec();
    }

    getChanelById(id: string): Promise<ChannelDocument> {
        return this.chanelModel.findById(id).exec();
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
      
        ChannelEntity.members.forEach((newMember) => {
            const exists = channel.members.some(
              (existingMember) => existingMember.userId.toString() === newMember.userId.toString()
            );
          
            if (!exists) {
              channel.members.push({
                userId: new mongoose.Schema.Types.ObjectId(newMember.userId) as mongoose.Schema.Types.ObjectId,
                role: newMember.role,
              });
            }
          });
          
       

        return this.chanelModel.findByIdAndUpdate(id, {
          ...ChannelEntity,
          members: channel.members
        }, { new: true }).exec();
      }
      

      async deleteChanel(id: string,ownerId:string): Promise<{ msg: string }> {

        const channel = await this.chanelModel.findById(id).exec();
        
        if (!channel) {
        throw new NotFoundException('Channel not found');
                }
       
        
        const deletedChanel = await this.chanelModel.findByIdAndDelete(id).exec();
        if (!deletedChanel) {
            throw new NotFoundException('There is no channel with that id');
        }
        return { msg: 'Channel deleted' }; 

    }

    async getChanelDmByUsers(id: string, authId: string): Promise<ChannelDocument> {
      const channel = await this.chanelModel
        .findOne({
          members: {
            $all: [
              { $elemMatch: { userId: id } },    
              { $elemMatch: { userId: authId } }
            ]
          },
          type: 'dm', 
        })
        .exec();
    
      if (!channel) {
        throw new NotFoundException('Channel not found for the provided users');
      }
    
      return channel;
    }
    

}