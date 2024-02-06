import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQMessageConsumerService } from '../../infrastructure/service/message-broker/rabbitmq.consumer';
import { ConsumeMessage } from 'amqplib';
import { ProcessChatMessageUsecase } from '../../app/usecase/chat-message/process-chat-message.usecase';
import { RabbitMQInstance } from '../../infrastructure/provider/rabbitmq.connection';
import { ChatMessage } from '../../app/entity/chat-message';
import { ChatRoom } from '../../app/entity/chat-room';

@Injectable()
export class ChatMessageSubscriber implements OnModuleInit {
  private _consumer: RabbitMQMessageConsumerService;
  constructor(private processMessageUseCase: ProcessChatMessageUsecase) {
    this._consumer = new RabbitMQMessageConsumerService(RabbitMQInstance.channel);
  }

  async onModuleInit() {
    await this._consumer.consume('ChatMessage', this.consumeMessage.bind(this));
  }

  private async consumeMessage(msg: ConsumeMessage): Promise<boolean> {
    const body = msg.content.toString('utf8');
    const parsedBody = JSON.parse(body);
    console.log('consume', body);

    const chatMessage = new ChatMessage();
    chatMessage.content = parsedBody['content'];

    const room = new ChatRoom();
    room.roomId = parsedBody.room.roomId;

    await this.processMessageUseCase.notifyMessageToRoom(room, chatMessage);
    return true;
  }
}
