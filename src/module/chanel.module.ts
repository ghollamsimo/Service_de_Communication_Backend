import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from '../schemas/chanel.schema';
import { ChanelsController } from 'src/controllers/chanel.controller';
import { chanelService } from 'src/services/chanel.service';
import { ChanelImplementations } from 'src/repository/implementations/chanel.implementation';
import { AuthMidllware } from 'src/gards/auth.gard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
  controllers: [ChanelsController],
  providers: [chanelService,ChanelImplementations,AuthMidllware],
  exports:[ChanelImplementations]
})
export class ChannelModule {}
