import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendController } from "src/controllers/friend.controller";
import { FriendSchema } from "src/schemas/friend.schema";
import { FriendService } from "src/services/friend.service";
import { FriendImplementations } from "../repository/implementations/friend.implementation";
import { User, UserModelSchema } from "src/schemas/user.schema";
import { NotificationModule } from './notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Friend", schema: FriendSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }]),
    NotificationModule,
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendImplementations],
})
export class FriendModule {}
