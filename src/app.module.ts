import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatMessageModule } from './server/chat-message/chat-message.module';

@Module({
  imports: [ChatMessageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
