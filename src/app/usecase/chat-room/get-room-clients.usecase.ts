import { Inject, Injectable } from '@nestjs/common';
import { RoomStateRepository } from '../../repository/room-state.repository';

@Injectable()
export class GetRoomClientsUsecase {
  private _roomStateRepo: RoomStateRepository;

  constructor(@Inject('ROOM_STATE_REPOSITORY') roomStateRepository: RoomStateRepository) {
    this._roomStateRepo = roomStateRepository;
  }

  public async getClients(roomId: string) {
    return this._roomStateRepo.getRoomClients(roomId);
  }
}
