import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { RabbitMQInstance } from '../../infrastructure/driver/rabbitmq.driver';
import { ChatMessageSubscriber } from './chat-message.subscriber';
import { RabbitMQMessagePublisherService } from '../../infrastructure/service/publisher/rabbitmq.publisher';
import { RabbitMQMessageConsumerService } from '../../infrastructure/service/consumer/rabbitmq.consumer';

@Module({
  controllers: [ChatMessageController],
  providers: [
    {
      provide: RabbitMQMessagePublisherService,
      useFactory: async () => {
        // ? create a new channel for publisher, to separate channel with consumers.
        const channel = await RabbitMQInstance.connection.createChannel();
        return new RabbitMQMessagePublisherService(channel);
      },
    },
    {
      provide: ChatMessageSubscriber,
      useFactory: async () => {
        const channel = await RabbitMQInstance.connection.createChannel();
        return new ChatMessageSubscriber(new RabbitMQMessageConsumerService(channel));
      },
    },
  ],
})
export class ChatMessageModule {}
