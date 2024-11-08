import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import axios from "axios";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";



export  class FrienImplementatins implements FriendInterface {
 
    constructor(@InjectModel(Friend.name) private readonly FriendMoodel:Model<FriendDocument> ){}



   createFriendRequest(Friendentity: FriendEntity): Promise<FriendDocument> {

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


}
