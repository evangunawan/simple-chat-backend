import { Module } from '@nestjs/common';
import { ChatMessageController } from './chat-message.controller';

@Module({
  controllers: [ChatMessageController],
})
export class ChatMessageModule {}
