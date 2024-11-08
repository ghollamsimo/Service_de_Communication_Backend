import { Injectable } from "@nestjs/common";
import { FrienImplementatins } from '../repository/implementations/friend.implementation';
import { FriendEntity } from '../entities/friend.entity';
import { FriendDocument } from "src/schemas/friend.schema";




@Injectable()

export class FriendService{

    constructor(private readonly FrienImplementatins:FrienImplementatins){}


    async createFriendRequest(FriendEntity:FriendEntity):Promise<FriendDocument>{
        return this.FrienImplementatins.createFriendRequest(FriendEntity);
    }
    async acceptFriendRequest (accepterId:string,id:string){
        return this.FrienImplementatins.acceptFriendRequest(accepterId, id);
    }

}