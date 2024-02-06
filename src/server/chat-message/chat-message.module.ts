import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageSubscriber } from './chat-message.subscriber';
import { RabbitMQMessagePublisherService } from '../../infrastructure/service/message-broker/rabbitmq.publisher';
import { RabbitMQMessageConsumerService } from '../../infrastructure/service/message-broker/rabbitmq.consumer';
import { ChatMessageUsecase } from '../../app/usecase/chat-message/chat-message.usecase';
import { RabbitMQInstance } from '../../infrastructure/provider/rabbitmq.connection';

@Module({
  controllers: [ChatMessageController],
  providers: [
    {
      provide: ChatMessageUsecase,
      useFactory: async () => {
        const channel = await RabbitMQInstance.connection.createChannel();
        return new ChatMessageUsecase(new RabbitMQMessagePublisherService(channel));
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
