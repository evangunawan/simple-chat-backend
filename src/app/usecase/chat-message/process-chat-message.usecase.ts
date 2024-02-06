import { Inject, Injectable } from '@nestjs/common';
import { SocketService } from '../../service/socket';
import { ChatMessage } from '../../entity/chat-message';
import { ChatRoom } from '../../entity/chat-room';

@Injectable()
export class ProcessChatMessageUsecase {
  private _socketService: SocketService;

  constructor(@Inject('SOCKET_SERVICE') socketService: SocketService) {
    this._socketService = socketService;
  }

  public async notifyMessageToRoom(room: ChatRoom, message: ChatMessage) {
    console.log('sending', message.content, 'to', room.roomId);
    this._socketService.send(room.roomId, 'chat', message.content);
  }
}
