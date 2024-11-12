import { Injectable } from "@nestjs/common";
import { FriendImplementations } from "../repository/implementations/friend.implementation";
import { FriendEntity } from "../entities/friend.entity";
import { FriendDocument } from "src/schemas/friend.schema";

@Injectable()
export class FriendService {
  constructor(private readonly FriendImplementations: FriendImplementations) {}

  async createFriendRequest(
    FriendEntity: FriendEntity,
  ): Promise<FriendDocument> {
    return this.FriendImplementations.createFriendRequest(FriendEntity);
  }
  async acceptFriendRequest(accepterId: string, id: string) {
    return this.FriendImplementations.acceptFriendRequest(accepterId, id);
  }
  async blockFriend(blockerId: string, id: string) {
    return this.FriendImplementations.blockFriendRequest(blockerId, id);
  }
  async cancelFriend(cancelerId: string, id: string) {
    return this.FriendImplementations.cancelFriendRequest(cancelerId, id);
  }

  async unblockFriend(unblockerId: string, id: string) {
    return this.FriendImplementations.UnblockFriendRequest(unblockerId, id);
  }
}
