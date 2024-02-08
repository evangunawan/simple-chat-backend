import { Inject, Injectable } from '@nestjs/common';
import { RoomStateRepository } from '../../repository/room-state.repository';
import { SocketService } from '../../service/socket';

@Injectable()
export class JoinRoomUsecase {
  private _roomStateRepo: RoomStateRepository;
  private _socketService: SocketService;

  constructor(
    @Inject('ROOM_STATE_REPOSITORY') roomStateRepository: RoomStateRepository,
    @Inject('SOCKET_SERVICE') socketService: SocketService,
  ) {
    this._roomStateRepo = roomStateRepository;
    this._socketService = socketService;
  }

  public async joinRoom(roomId: string, clientId: string) {
    await this._roomStateRepo.addClientToRoom(roomId, clientId);
    const data = { clientId };
    this._socketService.send(roomId, 'roomjoin', JSON.stringify(data));
  }
}
