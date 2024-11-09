import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "src/schemas/user.schema";



export  class FrienImplementatins implements FriendInterface {
 
    constructor(
        @InjectModel(Friend.name) private readonly FriendMoodel:Model<FriendDocument>,
        @InjectModel(User.name) private readonly UserModel: Model<UserDocument> 


){}



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

    await this.FriendMoodel.findByIdAndUpdate(request._id, { status: 'accepted' }, { new: true });

    await this.UserModel.updateOne(
        { _id: request.receiverId },
        { $addToSet: { friends: request.requesterId } }
    );
    await this.UserModel.updateOne(
        { _id: request.requesterId },
        { $addToSet: { friends: request.receiverId } }
    );

    return { msg: 'Friend request accepted successfully' };
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

    if (request.requesterId !== cancelerId) {
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
