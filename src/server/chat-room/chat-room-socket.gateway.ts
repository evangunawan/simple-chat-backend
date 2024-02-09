import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinRoomUsecase } from '../../app/usecase/chat-room/join-room.usecase';
import { LeaveRoomUsecase } from '../../app/usecase/chat-room/leave-room.usecase';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class ChatRoomSocketGateway {
  @WebSocketServer()
  private _server: Server;

  constructor(
    private joinRoomUseCase: JoinRoomUsecase,
    private leaveRoomUseCase: LeaveRoomUsecase,
  ) {}

  @SubscribeMessage('joinroom')
  async handleJoinRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    let parsed: { token: string };
    try {
      parsed = JSON.parse(data);
    } catch (e) {}
    if (parsed) {
      const { token } = parsed;

      client.on('disconnect', () => {
        this.leaveRoomUseCase.leaveRoom(client.id, token);
      });
      await this.joinRoomUseCase.joinRoom(client.id, token);
    }
  }

  @SubscribeMessage('leaveroom')
  async handleLeaveRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    let parsed: { token: string };
    try {
      parsed = JSON.parse(data);
    } catch (e) {}
    if (parsed) {
      const { token } = parsed;
      await this.leaveRoomUseCase.leaveRoom(client.id, token);
    }
  }
}
