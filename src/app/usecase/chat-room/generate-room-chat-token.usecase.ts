import { Inject, Injectable } from '@nestjs/common';
import { RoomChatTokenRepository } from '../../repository/room-chat-token.repository';
import { v4 } from 'uuid';
import { ChatRoomSession } from '../../entity/chat-room-session';

@Injectable()
export class GenerateRoomChatTokenUsecase {
  constructor(
    @Inject('ROOM_CHAT_TOKEN_REPOSITORY') private roomChatTokenRepository: RoomChatTokenRepository,
  ) {}

  public async generateRoomChatToken(payload: ChatRoomSession): Promise<string> {
    const token = v4();
    await this.roomChatTokenRepository.saveRoomChatToken(token, payload);
    return token;
  }
}
