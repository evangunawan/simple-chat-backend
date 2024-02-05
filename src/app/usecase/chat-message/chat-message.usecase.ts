import { MessagePublisher } from '../../service/message-publisher';

export class ChatMessageUsecase {
  private _chatMessagePublisher: MessagePublisher;
  constructor(chatMessagePublisher: MessagePublisher) {
    this._chatMessagePublisher = chatMessagePublisher;
  }

  public sendMessage() {}
}
