import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthMidllware } from "src/gards/auth.gard";
import { MessageService } from "src/services/message.service";
import {  MessageEntity } from '../entities/message.entity';

@Controller('message')
@UseGuards(AuthMidllware)

export class MessageController{
    constructor(private readonly MessageService: MessageService) { }
    
    @Post('send/:channelId')
    async create(@Body() body: {  content: string, }, @Req() req , @Param('channelId') channelId) {
        
        const senderId = req.user._id;
       
        const Messageentity = new MessageEntity(
            senderId,
            channelId,
            body.content
        );
     
  
        return this.MessageService.creat(Messageentity);
    }

    @Get('getmessages/:id')
    getMessages(@Param('id') id:string){
        return this.MessageService.getMessages(id);

    }
}