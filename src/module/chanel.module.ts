import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from '../schemas/chanel.schema';
import { ChanelsController } from 'src/controllers/chanel.controller';
import { chanelService } from 'src/services/chanel.service';
import { ChanelImplementations } from 'src/repository/implementations/chanel.implementation';
import { User, UserModelSchema } from 'src/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserModelSchema }])

  ],
  controllers: [ChanelsController],
  providers: [chanelService,ChanelImplementations],
  exports:[ChanelImplementations]
})
export class ChannelModule {}
