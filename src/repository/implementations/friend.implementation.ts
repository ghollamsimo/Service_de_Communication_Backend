import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "src/schemas/user.schema";
import { Channel, ChannelDocument } from '../../schemas/chanel.schema';



export  class FrienImplementatins implements FriendInterface {
 
    constructor(
        @InjectModel(Friend.name) private readonly FriendMoodel:Model<FriendDocument>,
        @InjectModel(User.name) private readonly UserModel: Model<UserDocument> ,
        @InjectModel(Channel.name) private readonly ChannelModel: Model<ChannelDocument> ,


){}



   createFriendRequest(Friendentity: FriendEntity): Promise<FriendDocument> {
     
     if (Friendentity.receiverId === Friendentity.requesterId) {
         throw new UnauthorizedException('you cant send a friend request to your self');
     }
    const newfriend = new this.FriendMoodel(Friendentity)
       return newfriend.save() ;
   }



   async acceptFriendRequest(accepterId: string, id: string): Promise<{ msg: string}> {
    const request = await this.FriendMoodel.findById(id);
  
    if (!request) {
      throw new NotFoundException('Friend request not found');
    }
    
    if (request.receiverId.toString() !== accepterId.toString()) {
      throw new UnauthorizedException('Unauthorized: Only the receiver can accept this request');
    }
  
    await this.FriendMoodel.findByIdAndUpdate(request._id, { status: 'accepted' }, { new: true });
  
    await this.UserModel.updateOne(
      { _id: request.receiverId },
      { $addToSet: { friends: request.requesterId } }
    );
    await this.UserModel.updateOne(
      { _id: request.requesterId },
      { $addToSet: { friends: request.receiverId } }
    );
  
    const newChannel = await this.ChannelModel.create({
        name:"direct message",
      members: [
        { userId: request.requesterId, role: 'member' },
        { userId: request.receiverId, role: 'member' }
      ],
      type: 'dm'
    });
  
    return {  msg: 'Friend request accepted successfully, and a new DM channel created' };
  }


async blockFriendRequest(blockerId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }

    if (request.status !== 'accepted') {
        throw new UnauthorizedException('Only an accepted friend request can be blocked');
    }

    await this.FriendMoodel.findByIdAndUpdate(request._id, { status: 'blocked' }, { new: true });

    await this.UserModel.updateOne(
        { _id: request.receiverId },
        { $pull: { friends: request.requesterId } }
    );
    await this.UserModel.updateOne(
        { _id: request.requesterId },
        { $pull: { friends: request.receiverId } }
    );

    return { msg: 'Friend request blocked successfully' };
}


async cancelFriendRequest(cancelerId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }
   
    
    if (request.requesterId !== cancelerId.toString()) {
        throw new UnauthorizedException('Unauthorized: Only the requester can cancel this request');
    }

    if (request.status === 'Accepted') {
        throw new BadRequestException('Cannot cancel an accepted friend request. You can only block the friend');
    }

    await this.FriendMoodel.findByIdAndDelete(id);

    return { msg: 'Friend request canceled successfully' };
}

async UnblockFriendRequest(unblockerId: string, id: string): Promise<{ msg: string }> {
    const request = await this.FriendMoodel.findById(id);

    if (!request) {
        throw new NotFoundException('Friend request not found');
    }

    if (request.status !== 'blocked') {
        throw new UnauthorizedException('Only a blocked friend request can be unblocked');
    }

    await this.FriendMoodel.findByIdAndUpdate(request._id, { status: 'accepted' }, { new: true });

    await this.UserModel.updateOne(
        { _id: request.receiverId },
        { $addToSet: { friends: request.requesterId } }
    );
    await this.UserModel.updateOne(
        { _id: request.requesterId },
        { $addToSet: { friends: request.receiverId } }
    );

    return { msg: 'Friend unblocked successfully' };
}



}
