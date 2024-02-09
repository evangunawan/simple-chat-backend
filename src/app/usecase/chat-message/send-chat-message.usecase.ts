import { MessagePublisher } from '../../service/message-publisher';
import { ChatMessage } from '../../entity/chat-message';
import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { RoomChatTokenRepository } from '../../repository/room-chat-token.repository';
import { ChatRoom } from '../../entity/chat-room';

@Injectable()
export class SendChatMessageUsecase {
  private _chatMessagePublisher: MessagePublisher;

  constructor(
    @Inject('PUBLISHER_SERVICE') chatMessagePublisher: MessagePublisher,
    @Inject('ROOM_CHAT_TOKEN_REPOSITORY') private roomChatTokenRepository: RoomChatTokenRepository,
  ) {
    this._chatMessagePublisher = chatMessagePublisher;
  }

  public async sendMessage(content: string, token: string) {
    const session = await this.roomChatTokenRepository.getRoomDetails(token);
    if (!session) {
      throw new Error('session-invalid');
    }

    const chatMessage = new ChatMessage();
    chatMessage.content = content;
    chatMessage.clientId = session.clientId;
    chatMessage.room = new ChatRoom(session.roomId);
    chatMessage.timestamp = moment().unix() * 1000;

    await this._chatMessagePublisher.publish('ChatMessage', chatMessage.toJSONString());
  }
}
