import { Inject, Injectable } from '@nestjs/common';
import { RoomStateRepository } from '../../repository/room-state.repository';
import { SocketService } from '../../service/socket';
import { RoomChatTokenRepository } from '../../repository/room-chat-token.repository';
import { ChatRoomSession } from '../../entity/chat-room-session';

@Injectable()
export class LeaveRoomUsecase {
  private _roomStateRepo: RoomStateRepository;
  private _socketService: SocketService;

  constructor(
    @Inject('ROOM_STATE_REPOSITORY') roomStateRepository: RoomStateRepository,
    @Inject('ROOM_CHAT_TOKEN_REPOSITORY') private roomChatTokenRepository: RoomChatTokenRepository,
    @Inject('SOCKET_SERVICE') socketService: SocketService,
  ) {
    this._roomStateRepo = roomStateRepository;
    this._socketService = socketService;
  }

  public async leaveRoom(socketId: string, roomChatToken: string): Promise<ChatRoomSession> {
    const tokenDetails = await this.roomChatTokenRepository.getRoomDetails(roomChatToken);
    if (!tokenDetails) {
      // throw new Error('token invalid or not found.');
      return;
    }

    const { roomId, clientId } = tokenDetails;
    this._socketService.leaveRoom(socketId, roomId);
    await this._roomStateRepo.removeClientFromRoom(roomId, clientId);
    await this.roomChatTokenRepository.destroy(roomChatToken);
    const data = { clientId };
    this._socketService.send(roomId, 'roomleave', JSON.stringify(data));

    return { roomId, clientId };
  }
}
