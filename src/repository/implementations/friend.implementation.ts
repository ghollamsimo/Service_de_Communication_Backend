import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "src/schemas/user.schema";
import { Channel, ChannelDocument } from '../../schemas/chanel.schema';
import { Notification, NotificationDocument } from '../../schemas/notification.schema';



export  class FrienImplementatins implements FriendInterface {
    constructor(
        @InjectModel(Friend.name) private readonly FriendModel: Model<FriendDocument>,
        @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
        @InjectModel(Notification.name) private readonly NotificationModel: Model<NotificationDocument>,
        @InjectModel(Channel.name) private readonly ChannelModel: Model<ChannelDocument>
    ) { }
    UnblockFriendRequest(unblockerId: string, id: string): Promise<{ msg: string; }> {
        throw new Error("Method not implemented.");
    }

    async createFriendRequest(FriendEntity: FriendEntity): Promise<FriendDocument> {
        if (FriendEntity.receiverId === FriendEntity.requesterId) {
            throw new UnauthorizedException("You can't send a friend request to yourself");
        }

        const newFriend = new this.FriendModel(FriendEntity);

        await this.NotificationModel.create({
            type: 'friend_request',
            content: `${FriendEntity.requesterId} sent a friend request.`,
            senderId: FriendEntity.requesterId,
            receiverId: FriendEntity.receiverId,
        });
        
        return newFriend.save();
    }
    async acceptFriendRequest(accepterId: string, id: string): Promise<{ msg: string }> {
        const request = await this.FriendModel.findById(id);

        if (!request) {
            throw new NotFoundException('Friend request not found');
        }

        if (request.receiverId.toString() !== accepterId.toString()) {
            throw new UnauthorizedException('Unauthorized: Only the receiver can accept this request');
        }

        request.status = 'accepted';
        await request.save();
        await this.ChannelModel.create({
            type: 'dm',
            members: [
                { userId: request.requesterId, role: 'member' },
                { userId: request.receiverId, role: 'member' }
            ],
            safeMode: false,
        });

        await this.UserModel.updateOne(
            { _id: request.receiverId },
            { $addToSet: { friends: request.requesterId } }
        );
        await this.UserModel.updateOne(
            { _id: request.requesterId },
            { $addToSet: { friends: request.receiverId } }
        );

        await this.NotificationModel.create({
            type: 'friend_request',
            content: `${request.receiverId} has accepted your friend request.`,
            senderId: request.receiverId,
            receiverId: request.requesterId,
        });

        return { msg: 'Friend request accepted successfully' };
    }
    async blockFriendRequest(blockerId: string, id: string): Promise<{ msg: string }> {
        const request = await this.FriendModel.findById(id);

        if (!request) {
            throw new NotFoundException('Friend request not found');
        }

        if (request.status !== 'accepted') {
            throw new UnauthorizedException('Only an accepted friend request can be blocked');
        }

        await this.FriendModel.findByIdAndUpdate(request._id, { status: 'blocked' }, { new: true });

        const channel = await this.ChannelModel.findOne({
            type: 'dm',
            members: {
                $all: [
                    { $elemMatch: { userId: request.requesterId, role: 'member' } },
                    { $elemMatch: { userId: request.receiverId, role: 'member' } }
                ]
            },
            safeMode: false
        });

        if (channel) {
            await this.ChannelModel.updateOne(
                { _id: channel._id },
                { $set: { status: 'Archived' } }
            );
        } else {
            console.log("Channel not found for update.");
        }

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
        const request = await this.FriendModel.findById(id);

        if (!request) {
            throw new NotFoundException('Friend request not found');
        }

        if (request.requesterId !== cancelerId.toString()) {
            throw new UnauthorizedException('Unauthorized: Only the requester can cancel this request');
        }

        if (request.status === 'accepted') {
            throw new BadRequestException('Cannot cancel an accepted friend request. You can only block the friend');
        }

        await this.FriendModel.findByIdAndDelete(id);

        return { msg: 'Friend request canceled successfully' };
    }

    async unblockFriendRequest(unblockerId: string, id: string): Promise<{ msg: string }> {
        const request = await this.FriendModel.findById(id);

        if (!request) {
            throw new NotFoundException('Friend request not found');
        }

        if (request.status !== 'blocked') {
            throw new UnauthorizedException('Only a blocked friend request can be unblocked');
        }

        await this.FriendModel.findByIdAndUpdate(request._id, { status: 'accepted' }, { new: true });

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
