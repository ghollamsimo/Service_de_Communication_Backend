import { ChannelDocument } from "src/schemas/chanel.schema";
import { ChannelEntity } from '../../entities/chanel.entity';





export interface  ChanelInetface {

    getAllChanels():Promise<ChannelDocument[]>;

    getChanelById(id:string):Promise<ChannelDocument>;

    createChanel(ChannelEntity:ChannelEntity):Promise<ChannelDocument>;

    updateChanel(id: string,ChannelEntity:ChannelEntity):Promise<ChannelDocument>;

    deleteChanel(id:string,ownerId:string):Promise<{msg:string}>; 
   


} 