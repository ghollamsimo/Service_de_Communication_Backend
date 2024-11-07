import { BadRequestException, Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { FriendService } from '../services/friend.service';
import { AuthMidllware } from "src/gards/auth.gard";
import {  FriendEntity } from '../entities/friend.entity';
import { Types } from "mongoose";




@Controller('friends')
@UseGuards(AuthMidllware)

export class FriendController{

    constructor(private readonly FriendService:FriendService){}




    @Post('send')

    createFriendRequest(
        @Request() req,
        @Body() body:{
            receiverId:string,   
        }
    ){
        const  requesterId = req.user._id;
        if (!Types.ObjectId.isValid(body.receiverId)) {
            throw new BadRequestException('Invalid ownerId');
        }
        const Friendentity = new  FriendEntity(requesterId, body.receiverId);
        
        return this.FriendService.createFriendRequest(Friendentity);



    }
}