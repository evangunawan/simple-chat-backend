import { Module } from '@nestjs/common';
import { SocketIoService } from '../../../infrastructure/service/socket-io.service';
import { JoinRoomUsecase } from './join-room.usecase';
import { RedisRoomStateRepository } from '../../../infrastructure/repository/room-state/redis';
import { LeaveRoomUsecase } from './leave-room.usecase';
import { GetRoomClientsUsecase } from './get-room-clients.usecase';
import { GenerateRoomChatTokenUsecase } from './generate-room-chat-token.usecase';
import { RedisRoomChatTokenRepository } from '../../../infrastructure/repository/room-chat-token/redis';

@Module({
  providers: [
    JoinRoomUsecase,
    LeaveRoomUsecase,
    GetRoomClientsUsecase,
    GenerateRoomChatTokenUsecase,
    {
      provide: 'SOCKET_SERVICE',
      useFactory: () => new SocketIoService(),
    },
    {
      provide: 'ROOM_STATE_REPOSITORY',
      useFactory: () => new RedisRoomStateRepository(),
    },
    {
      provide: 'ROOM_CHAT_TOKEN_REPOSITORY',
      useFactory: () => new RedisRoomChatTokenRepository(),
    },
  ],
  exports: [JoinRoomUsecase, LeaveRoomUsecase, GetRoomClientsUsecase, GenerateRoomChatTokenUsecase],
})
export class ChatRoomUsecaseModule {}
