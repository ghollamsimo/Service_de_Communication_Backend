import { Body, Controller, Post } from "@nestjs/common";
import { chanelService } from '../services/chanel.service';
import { ChannelEntity } from "dist/entities/chanel.entity";



@Controller('chanels')

export class  ChanelsController {

    constructor(private readonly chanelService:chanelService) { }


    @Post('create')
    createChanel(@Body()
    body: {
      name: string;
      type: string;
      ownerId: string;
     
    } ){
     const ChanelEntity = new  ChannelEntity(body.name, body.type, body.ownerId)
        
    }


}

