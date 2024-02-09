import { Module } from '@nestjs/common';
import { SendChatMessageUsecase } from './send-chat-message.usecase';
import { RabbitMQMessagePublisherService } from '../../../infrastructure/service/message-broker/rabbitmq.publisher';
import { SocketIoService } from '../../../infrastructure/service/socket-io.service';
import { ProcessChatMessageUsecase } from './process-chat-message.usecase';
import { RabbitMQInstance } from '../../../infrastructure/provider/rabbitmq.connection';
import { RedisRoomChatTokenRepository } from '../../../infrastructure/repository/room-chat-token/redis';

@Module({
  providers: [
    SendChatMessageUsecase,
    ProcessChatMessageUsecase,
    {
      provide: 'SOCKET_SERVICE',
      useFactory: () => new SocketIoService(),
    },
    {
      provide: 'PUBLISHER_SERVICE',
      useFactory: () => new RabbitMQMessagePublisherService(RabbitMQInstance.channel),
    },
    {
      provide: 'ROOM_CHAT_TOKEN_REPOSITORY',
      useFactory: () => new RedisRoomChatTokenRepository(),
    },
  ],
  exports: [SendChatMessageUsecase, ProcessChatMessageUsecase],
})
export class ChatMessageUsecaseModule {}
