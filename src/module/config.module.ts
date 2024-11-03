/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { ChannelModule } from './chanel.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/communication'),
    AuthModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfiigModule {}
