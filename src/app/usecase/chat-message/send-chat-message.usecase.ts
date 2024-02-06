import { MessagePublisher } from '../../service/message-publisher';
import { ChatMessage } from '../../entity/chat-message';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SendChatMessageUsecase {
  private _chatMessagePublisher: MessagePublisher;

  constructor(@Inject('PUBLISHER_SERVICE') chatMessagePublisher: MessagePublisher) {
    this._chatMessagePublisher = chatMessagePublisher;
  }

  public async sendMessage(chatMessage: ChatMessage) {
    await this._chatMessagePublisher.publish('ChatMessage', chatMessage.toJSONString());
  }
}
