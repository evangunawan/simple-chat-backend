import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketConnectionInstance } from '../provider/socket.connection';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppSocketGateway implements OnGatewayInit {
  @WebSocketServer()
  private _server: Server;

  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.emit('ping', `pong ${data}`);
  }

  afterInit(server: Server) {
    this._server = server;
    console.log('init socket Server');
    SocketConnectionInstance.setServer(server);
  }
}
