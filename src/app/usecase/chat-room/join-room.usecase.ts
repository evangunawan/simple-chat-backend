import { Inject, Injectable } from '@nestjs/common';
import { RoomStateRepository } from '../../repository/room-state.repository';
import { SocketService } from '../../service/socket';
import { RoomChatTokenRepository } from '../../repository/room-chat-token.repository';
import { ChatRoomSession } from '../../entity/chat-room-session';

@Injectable()
export class JoinRoomUsecase {
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

  public async joinRoom(socketId: string, roomChatToken: string): Promise<ChatRoomSession> {
    const tokenDetails = await this.roomChatTokenRepository.getRoomDetails(roomChatToken);
    if (!tokenDetails) {
      // throw new Error('token invalid or not found.');
      return;
    }

    const { roomId, clientId } = tokenDetails;

    this._socketService.joinRoom(socketId, roomId);
    await this._roomStateRepo.addClientToRoom(roomId, clientId);
    const data = { clientId };
    this._socketService.send(roomId, 'roomjoin', JSON.stringify(data));

    return { roomId, clientId };
  }
}
