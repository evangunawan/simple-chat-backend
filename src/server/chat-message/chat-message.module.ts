import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessageSubscriber } from './chat-message.subscriber';
import { ChatMessageUsecaseModule } from '../../app/usecase/chat-message/chat-message-usecase.module';

@Module({
  imports: [ChatMessageUsecaseModule],
  controllers: [ChatMessageController],
  providers: [ChatMessageSubscriber],
})
export class ChatMessageModule {}
