import { Server } from 'socket.io';

export class WebSocketService {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });

        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);

            socket.on('join', (userId: string) => {
                socket.join(userId);
            });

            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }

    emitToUser(userId: string, event: string, payload: any) {
        this.io.to(userId).emit(event, payload);
    }
}
