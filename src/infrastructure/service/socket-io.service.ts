import { Injectable } from '@nestjs/common';
import { SocketService } from '../../app/service/socket';
import { SocketConnectionInstance } from '../provider/socket.connection';

@Injectable()
export class SocketIoService implements SocketService {
  constructor() {}

  public send(room: string, event: string, data: string): void {
    const server = SocketConnectionInstance.server;

    server.to(room).emit(event, data);
  }
}
