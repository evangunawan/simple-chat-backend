import { Module } from '@nestjs/common';
import { AppController } from './server/app.controller';
import { ChatMessageModule } from './server/chat-message/chat-message.module';
import { AppSocketGateway } from './server/app-socket.gateway';

@Module({
  imports: [ChatMessageModule],
  controllers: [AppController],
  providers: [AppSocketGateway],
})
export class AppModule {}
