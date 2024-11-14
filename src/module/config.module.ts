/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { ChannelModule } from './chanel.module';
import { FriendModule } from './friend.module';
import { MessagesModule } from './messages.module';
import { WebRtcGateway } from 'src/gateways/webrtc.gateway';
import { GatWaymodule } from './gatway.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/communication'),
    
    AuthModule,
    ChannelModule,
    FriendModule,
    MessagesModule,
    GatWaymodule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfiigModule {}
