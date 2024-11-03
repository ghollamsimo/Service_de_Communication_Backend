import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { chanelService } from '../services/chanel.service';
import { ChannelDocument } from "src/schemas/chanel.schema";
import { ChannelEntity } from "src/entities/chanel.entity";



@Controller('chanels')

export class  ChanelsController {

    constructor(private readonly chanelService:chanelService) { }


    @Post('create')
    createChanel(@Body()
    body: {
      name?: string;
      type?: string;
      ownerId?: string;
     
    } ): Promise<ChannelDocument>{
     const ChanelEntity = new  ChannelEntity(body.name, body.type, body.ownerId);
     return this.chanelService.createChanel(ChanelEntity);
        
    }


    @Patch('update/:id')
    updateChanel(
      @Param('id') id: string,
      @Body() body: { 
        name?: string; 
        type?: string; 
        ownerId?: string;
        members?: string[];
        moderators?: string[];
        bannedWords?: string[];
      }
    ): Promise<ChannelDocument> {
      const ChanelEntity = new ChannelEntity(
        body.name,
        body.type,
        body.ownerId,
        body.members,
        body.moderators,
        body.bannedWords
      );
    
      return this.chanelService.updateChanel(id, ChanelEntity);
    }
    


}

