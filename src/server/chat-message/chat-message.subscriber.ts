import { Controller, OnModuleInit } from '@nestjs/common';
import { RabbitMQMessageConsumerService } from '../../infrastructure/service/consumer/rabbitmq.consumer';
import { ConsumeMessage } from 'amqplib';

export class ChatMessageSubscriber implements OnModuleInit {
  constructor(private rabbitMqConsumer: RabbitMQMessageConsumerService) {}
  async onModuleInit() {
    await this.rabbitMqConsumer.consume('ChatMessage', this.consumeMessage);
  }

  private async consumeMessage(msg: ConsumeMessage): Promise<boolean> {
    console.log('consume', msg.content.toString('utf8'));
    return true;
  }
}
