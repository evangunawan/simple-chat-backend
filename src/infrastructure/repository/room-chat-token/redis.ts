import { Injectable } from '@nestjs/common';
import { RoomChatTokenRepository } from '../../../app/repository/room-chat-token.repository';
import { RedisInstance } from '../../provider/redis.connection';
import { ChatRoomSession } from '../../../app/entity/chat-room-session';

@Injectable()
export class RedisRoomChatTokenRepository implements RoomChatTokenRepository {
  private _redisClient: any;

  constructor() {
    this._redisClient = RedisInstance.client;
  }

  public async destroy(token: string): Promise<void> {
    await this._redisClient.del(token);
  }

  async getRoomDetails(token: string): Promise<ChatRoomSession> {
    const result = await this._redisClient.get(token);
    let parsed: ChatRoomSession;

    try {
      parsed = JSON.parse(result);
    } catch (e) {}

    return parsed || null;
  }

  async saveRoomChatToken(
    token: string,
    payload: { roomId: string; clientId: string },
  ): Promise<void> {
    await this._redisClient.set(token, JSON.stringify(payload));
  }
}
