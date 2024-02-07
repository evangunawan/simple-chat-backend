import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketConnectionInstance } from '../infrastructure/provider/socket.connection';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class AppSocketGateway implements OnGatewayInit {
  @WebSocketServer()
  private _server: Server;

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.emit('ping', `pong ${data}`);
  }

  // chat room message handler included here, should we create new gateway?

  @SubscribeMessage('joinroom')
  handleJoinRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.join(data);
    this._server.to(data).emit('roomevent', 'someone joined');
  }

  @SubscribeMessage('leaveroom')
  handleLeaveRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.leave(data);
    this._server.to(data).emit('roomevent', 'someone left');
  }

  afterInit(server: Server) {
    this._server = server;
    server.on('connection', (client) => {
      // console.log(`client ${client.id} connected`);
      client.on('disconnect', () => {
        // console.log(client.rooms);
        // console.log(`client ${client.id} disconnected`);
      });
    });
    SocketConnectionInstance.setServer(server);
  }
}
