import { Injectable } from "@nestjs/common";
import { ChanelImplementations } from '../repository/implementations/chanel.implementation';
import { ChannelDocument } from "src/schemas/chanel.schema";
import { ChannelEntity } from "src/entities/chanel.entity";



@Injectable()
export class chanelService {

constructor(
    private readonly ChanelImplementations:ChanelImplementations
){}


getAllChanels(): Promise<ChannelDocument[]> {

    return this.ChanelImplementations.getAllChanels();
}

getChanelById(id: string): Promise<ChannelDocument> {
    return;
}


createChanel(ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
    return this.ChanelImplementations.createChanel(ChannelEntity);
}


updateChanel(id: string, ChannelEntity: ChannelEntity): Promise<ChannelDocument> {
    return this.ChanelImplementations.updateChanel(id, ChannelEntity);
  }

deleteChanel(ChannelEntity: ChannelEntity): Promise<{ msg: string; }> {
    return;
}



}