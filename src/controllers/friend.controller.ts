import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { FriendService } from "../services/friend.service";
import { AuthMidllware } from "src/gards/auth.gard";
import { FriendEntity } from "../entities/friend.entity";
import { Types } from "mongoose";

@Controller("friends")
@UseGuards(AuthMidllware)
export class FriendController {
    constructor(private readonly FriendService: FriendService) { }

    @Get('myfriends')
    async getmyfriends(  @Request() req){
        const id = req.user._id;
        return this.FriendService.getmyfriends(id);
    }

    @Post("send")
    createFriendRequest(
        @Request() req,
        @Body()
        body: {
            receiverId: string;
        },
    ) {
        const requesterId = req.user._id;
        if (!Types.ObjectId.isValid(body.receiverId)) {
            throw new BadRequestException("Invalid reciver id");
        }
        const Friendentity = new FriendEntity(requesterId, body.receiverId);

        return this.FriendService.createFriendRequest(Friendentity);
    }
    @Patch("accept/:id")
    accepteFriend(@Param("id") id: string, @Request() req) {
        const accepterId = req.user._id;

        return this.FriendService.acceptFriendRequest(accepterId, id);
    }

    @Patch("block/:id")
    blockFriend(@Param("id") id: string, @Request() req) {
        const blockerId = req.user._id;
        return this.FriendService.blockFriend(blockerId, id);
    }

    @Patch("cancel/:id")
    cancelFriend(@Param("id") id: string, @Request() req) {
        const cancelerId = req.user._id;
        return this.FriendService.cancelFriend(cancelerId, id);
    }

    @Patch("unblock/:id")
    unblockFriend(@Param("id") id: string, @Request() req) {
        const unblockerId = req.user._id;
        return this.FriendService.unblockFriend(unblockerId, id);
    }
}