import { Module } from '@nestjs/common';
import { SocketIoService } from '../../../infrastructure/service/socket-io.service';
import { JoinRoomUsecase } from './join-room.usecase';
import { RedisRoomStateRepository } from '../../../infrastructure/repository/room-state/redis';
import { LeaveRoomUsecase } from './leave-room.usecase';
import { GetRoomClientsUsecase } from './get-room-clients.usecase';

@Module({
  providers: [
    JoinRoomUsecase,
    LeaveRoomUsecase,
    GetRoomClientsUsecase,
    {
      provide: 'SOCKET_SERVICE',
      useFactory: () => new SocketIoService(),
    },
    {
      provide: 'ROOM_STATE_REPOSITORY',
      useFactory: () => new RedisRoomStateRepository(),
    },
  ],
  exports: [JoinRoomUsecase, LeaveRoomUsecase, GetRoomClientsUsecase],
})
export class ChatRoomUsecaseModule {}
