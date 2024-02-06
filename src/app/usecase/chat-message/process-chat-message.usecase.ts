import { Inject, Injectable } from '@nestjs/common';
import { SocketService } from '../../service/socket';
import { ChatMessage } from '../../entity/chat-message';

@Injectable()
export class ProcessChatMessageUsecase {
  private _socketService: SocketService;

  constructor(@Inject('SOCKET_SERVICE') socketService: SocketService) {
    this._socketService = socketService;
  }

  public async notifyMessageToRoom(message: ChatMessage) {
    this._socketService.send('test', 'message', message.content);
  }
}
