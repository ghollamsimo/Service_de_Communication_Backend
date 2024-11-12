import { Body, Controller, Post, Req } from "@nestjs/common";
import { MessageService } from "src/services/message.service";

@Controller('message')
class MessageController{
    constructor(private readonly MessageService: MessageService) { }
    
    @Post()
    async create(@Body() body: { senderId: string, receiverId: string, content: string, type: 'sent', }, @Req() req) {
        
    }
}