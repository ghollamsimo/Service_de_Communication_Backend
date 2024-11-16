import { Module } from '@nestjs/common';
import { WebSocketService } from '../services/webSocket.service'

@Module({
    providers: [WebSocketService],
    exports: [WebSocketService],
})
export class WebSocketModule { }
