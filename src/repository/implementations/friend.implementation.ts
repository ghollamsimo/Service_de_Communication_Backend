import { FriendEntity } from "src/entities/friend.entity";
import { Friend, FriendDocument } from "src/schemas/friend.schema";
import { FriendInterface } from "../interfaces/friend.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";



export  class FrienImplementatins implements FriendInterface {
 
    constructor(@InjectModel(Friend.name) private readonly FriendMoodel:Model<FriendDocument> ){}



   createFriendRequest(Friendentity: FriendEntity): Promise<FriendDocument> {

    const newfriend = new this.FriendMoodel(Friendentity)
       return newfriend.save() ;
   }

}
