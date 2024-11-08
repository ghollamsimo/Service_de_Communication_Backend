import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import axios from "axios";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";



export  class FrienImplementatins implements FriendInterface {
 
    constructor(@InjectModel(Friend.name) private readonly FriendMoodel:Model<FriendDocument> ){}



   createFriendRequest(Friendentity: FriendEntity): Promise<FriendDocument> {
     
     if (Friendentity.receiverId === Friendentity.requesterId) {
         throw new UnauthorizedException('you cant send a friend request to your self');
     }
    const newfriend = new this.FriendMoodel(Friendentity)
       return newfriend.save() ;
   }

   async acceptFriendRequest(accepterId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }
   
    

    if (request.receiverId !== accepterId) {
        throw new UnauthorizedException('Unauthorized: Only the receiver can accept this request');
    }

    const body = {
        accepterId: request.receiverId,
        acceptedId: request.requesterId
    };
      try {
            const response = await axios.patch('http://localhost:3002/auth/add_friend', body);
    
            const update = { status: 'accepted' };
        
            await this.FriendMoodel.findByIdAndUpdate(request._id, update, { new: true });
    
            return { msg: response.data.msg };

      } catch (error) {
        
      }

}

async blockFriendRequest(blockerId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }

    if (request.status === 'Pending') {
        throw new UnauthorizedException('Unauthorized: Only the accepted request  can be blocked ');
    }

    const body = {
        blockerId: request.receiverId,   
        blockedId: request.requesterId  
    };

    try {
        const response = await axios.patch('http://localhost:3002/auth/remove_friend', body);

        const update = { status: 'blocked' };
        
        await this.FriendMoodel.findByIdAndUpdate(request._id, update, { new: true });

        return { msg: response.data.msg };
        
    } catch (error) {
        throw new Error('Failed to block friend request');
    }
}

async cancelFriendRequest(cancelerId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }

    if (request.requesterId !== cancelerId) {
        throw new UnauthorizedException('Unauthorized: Only the requester can cancel this request');
    }

    if (request.status === 'accepted') {
        throw new BadRequestException('Cannot cancel an accepted friend request. You can only block the friend');
    }

    await this.FriendMoodel.findByIdAndDelete(id);

    return { msg: 'Friend request canceled successfully' };
}

async UnblockFriendRequest(unblockerId: string, id: string): Promise<{ msg: string; }> {

    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }

    if (request.status !== 'Blocked') {
        throw new UnauthorizedException('Unauthorized: Only the blocked request  can be unblocked ');
    }

    const body = {
        unblockerId: request.receiverId,   
        unblockedId: request.requesterId  
    };

    try {
        const response = await axios.patch('http://localhost:3002/auth/restore_friend', body);

        const update = { status: 'Accepted' };
        
        await this.FriendMoodel.findByIdAndUpdate(request._id, update, { new: true });

        return { msg: response.data.msg };
        
    } catch (error) {
        throw new Error('Failed to unblock friend request');
    }

}


}
