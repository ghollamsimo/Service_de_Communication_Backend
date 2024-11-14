import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { ChannelDocument } from 'src/schemas/chanel.schema';

@WebSocketGateway()
export class WebRtcGateway implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel('Channel') private readonly chanelModel: Model<ChannelDocument>
  ) {}

  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();

  onModuleInit() {
    this.server.on('connection', async (socket: Socket) => {
      try {
        const token = socket.handshake.query.token as string;
        if (!token) {
          throw new UnauthorizedException('Token is required');
        }
  
        const response = await axios.get<{ email: string }>('http://localhost:3002/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const email = response.data.email;
        if (!email) {
          throw new UnauthorizedException('Invalid token: Email not found');
        }
  
        const user = await this.UserModel.findOne({ email });
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
  
        this.connectedUsers.set(socket.id, user._id.toString());
        
        socket.on('disconnect', () => {
          this.connectedUsers.delete(socket.id); 
        });
  
      } catch (error) {
        socket.disconnect(true);
      }
    });
  }
  
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    const userId = this.connectedUsers.get(client.id);
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
  
    const channelId = body.channelId; 
    const content = body.content;
  
    const channel = await this.chanelModel.findById(channelId).exec();
    if (!channel) {
      throw new Error('Channel not found');
    }
  
  
    const usersInChannel = channel.members || [];
    const connectedUsersInChannel = usersInChannel.filter(member => {
      const memberUserId = member.userId.toString();
      const socketId = Array.from(this.connectedUsers.entries()).find(
        ([_, userId]) => userId === memberUserId
      )?.[0];
      
      return socketId !== undefined;
    });
  
  
    connectedUsersInChannel.forEach(member => {
        
        const socketId = [...this.connectedUsers.entries()]
      .find(([socketId, userId]) => userId === member.userId.toString());
         
        if (socketId) {
        const userSocket = this.server.sockets.sockets.get(socketId[0]);
        if (userSocket) {
            userSocket.emit('onMessage', {
            msg: 'new message',
            content: 'Hello!',
            channelId: 'someChannelId',
            userId: member.userId,
            });
        }
        } else {
        console.log(`User with userId ${member.userId} not connected`);
        }
            });
  }
  



}