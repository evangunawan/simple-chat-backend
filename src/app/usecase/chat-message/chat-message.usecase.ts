import { MessagePublisher } from '../../service/message-publisher';
import { ChatMessage } from '../../entity/chat-message';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatMessageUsecase {
  private _chatMessagePublisher: MessagePublisher;

  constructor(chatMessagePublisher: MessagePublisher) {
    this._chatMessagePublisher = chatMessagePublisher;
  }

  public async sendMessage(chatMessage: ChatMessage) {
    await this._chatMessagePublisher.publish('ChatMessage', chatMessage.toJSONString());
  }
}
