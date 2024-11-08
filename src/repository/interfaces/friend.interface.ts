import { FriendDocument } from 'src/schemas/friend.schema';
import { FriendEntity } from '../../entities/friend.entity';



export interface FriendInterface{

  createFriendRequest(FriendEntity:FriendEntity):Promise<FriendDocument>;
  acceptFriendRequest(accepterId:string,id:string):Promise<{msg:string}>;

}