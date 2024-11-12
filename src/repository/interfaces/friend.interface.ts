import { FriendDocument } from "src/schemas/friend.schema";
import { FriendEntity } from "../../entities/friend.entity";

export interface FriendInterface {
  createFriendRequest(FriendEntity: FriendEntity): Promise<FriendDocument>;
  acceptFriendRequest(accepterId: string, id: string): Promise<{ msg: string }>;
  blockFriendRequest(blockerId: string, id: string): Promise<{ msg: string }>;
  UnblockFriendRequest(
    unblockerId: string,
    id: string,
  ): Promise<{ msg: string }>;
  cancelFriendRequest(cancelerId: string, id: string): Promise<{ msg: string }>;
}
