import { Module } from '@nestjs/common';
import { ChatRoomSocketGateway } from './chat-room-socket.gateway';
import { ChatRoomUsecaseModule } from '../../app/usecase/chat-room/chat-room-usecase.module';
import { ChatRoomController } from './chat-room.controller';

@Module({
  controllers: [ChatRoomController],
  providers: [ChatRoomSocketGateway],
  imports: [ChatRoomUsecaseModule],
})
export class ChatRoomModule {}
