import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQMessageConsumerService } from '../../infrastructure/service/message-broker/rabbitmq.consumer';
import { ConsumeMessage } from 'amqplib';
import { ProcessChatMessageUsecase } from '../../app/usecase/chat-message/process-chat-message.usecase';
import { RabbitMQInstance } from '../../infrastructure/provider/rabbitmq.connection';

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
    console.log('consume', msg.content.toString('utf8'));
    this.processMessageUseCase.notifyMessageToRoom();
    return true;
  }
}
