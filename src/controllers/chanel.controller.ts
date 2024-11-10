import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { chanelService } from '../services/chanel.service';
import { ChannelDocument, ChannelType } from "src/schemas/chanel.schema";
import { ChannelEntity } from "src/entities/chanel.entity";
import { Types } from "mongoose";
import { AuthMidllware } from '../gards/auth.gard';



@Controller('chanels')
@UseGuards(AuthMidllware)
export class  ChanelsController {

    constructor(private readonly chanelService:chanelService) { }

    @Get('all')
    async getAllChanels(): Promise<ChannelDocument[]> {
      return this.chanelService.getAllChanels();
    }

    @Get('chanel/:id')
    async getChanelById(
      @Param('id') id: string,
    ): Promise<ChannelDocument>{
      return this.chanelService.getChanelById(id);

    }

    @Post('create')
    async createChanel(
      @Request() req,
      @Body() body: {
        name?: string;
        type?: string;
        members?: string[];  
        bannedWords?: string[];
      }
    ): Promise<ChannelDocument> {
      const ownerId = req.user._id;
      if (!Types.ObjectId.isValid(ownerId)) {
        throw new BadRequestException('Invalid ownerId');
      }
    
      if (body.members && !body.members.every(id => Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid memberId in members');
      }
    
      if (body.type && !Object.values(ChannelType).includes(body.type as ChannelType)) {
        throw new BadRequestException('Invalid channel type');
      }
    
      const members: { userId: string; role: 'owner' | 'member' | 'moderator' }[] = [
        { userId: ownerId.toString(), role: 'owner' }, 
       
      ];
    
      const channelEntity = new ChannelEntity(
        body.name || '', 
         ChannelType.PUBLIC, 
        members,  
        body.bannedWords,
        false  
      );
    
      return this.chanelService.createChanel(channelEntity);
    }


  //   @Patch('update/:id')
  //   updateChanel(
  //     @Request() req,

  //     @Param('id') id: string,
  //     @Body() body: { 
  //       name?: string; 
  //       type?: string; 
  //       members?: string[];
  //       moderators?: string[];
  //       bannedWords?: string[];
  //     }
  //   ): Promise<ChannelDocument> {
  //        const  ownerId = req.user._id;

  //       if (ownerId && !Types.ObjectId.isValid(ownerId)) {
  //           throw new BadRequestException('Invalid ownerId');
  //       }
  //       if (body.members && !body.members.every(id => Types.ObjectId.isValid(id))) {
  //           throw new BadRequestException('Invalid memberId in members');
  //       }
  //       if (body.moderators && !body.moderators.every(id => Types.ObjectId.isValid(id))) {
  //           throw new BadRequestException('Invalid moderatorId in moderators');
  //       }
  //     const ChanelEntity = new ChannelEntity(
  //       body.name,
  //       body.type,
  //       ownerId,
  //       body.members,
  //       body.moderators,
  //     );
    
  //     return this.chanelService.updateChanel(id, ChanelEntity);
  //   }

  //   @Delete('delete/:id')
  //  async deleteChanel(
  //   @Request() req,
  //   @Param('id') id: string,

  //  ){
  //   const ownerId = req.user._id
  //     return  this.chanelService.deleteChanel(id,ownerId);
  //  }

    


}

