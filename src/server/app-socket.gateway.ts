import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { SocketConnectionInstance } from '../infrastructure/provider/socket.connection';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppSocketGateway implements OnGatewayInit {
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.emit('ping', `pong ${data}`);
  }

  afterInit(server: Server) {
    SocketConnectionInstance.setServer(server);
  }
}
