import { MessagePublisher } from '../../service/message-publisher';
import { ChatMessage } from '../../entity/chat-message';
import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class SendChatMessageUsecase {
  private _chatMessagePublisher: MessagePublisher;

  constructor(@Inject('PUBLISHER_SERVICE') chatMessagePublisher: MessagePublisher) {
    this._chatMessagePublisher = chatMessagePublisher;
  }

  public async sendMessage(chatMessage: ChatMessage) {
    chatMessage.timestamp = moment().unix();
    await this._chatMessagePublisher.publish('ChatMessage', chatMessage.toJSONString());
  }
}
