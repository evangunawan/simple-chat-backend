import { Injectable } from '@nestjs/common';
import { RoomStateRepository } from '../../../app/repository/room-state.repository';
import { RedisInstance } from '../../provider/redis.connection';

@Injectable()
export class RedisRoomStateRepository implements RoomStateRepository {
  private _redisClient: any;

  constructor() {
    this._redisClient = RedisInstance.client;
  }

  public async addClientToRoom(roomId: string, clientId: string): Promise<void> {
    const currentRoom = await this._redisClient.get(roomId);
    if (!currentRoom) {
      await this._redisClient.set(roomId, '[]');
    }

    let roomClients: any[] = JSON.parse(currentRoom);
    if (!roomClients) {
      roomClients = [];
    }
    if (roomClients && roomClients.some((val) => val === clientId)) {
      return;
    }
    roomClients.push(clientId);

    await this._redisClient.set(roomId, JSON.stringify(roomClients));
  }

  public async removeClientFromRoom(roomId: string, clientId: string): Promise<void> {
    const currentRoom = await this._redisClient.get(roomId);
    if (!currentRoom) {
      return;
    }

    let roomClients: any[] = JSON.parse(currentRoom);
    if (!roomClients) {
      roomClients = [];
    }
    if (roomClients.some((val) => val === clientId)) {
      roomClients = roomClients.filter((val) => val !== clientId);
    }

    if (roomClients.length === 0) {
      await this._redisClient.del(roomId);
    } else {
      await this._redisClient.set(roomId, JSON.stringify(roomClients));
    }
  }

  public async getRoomClients(roomId: string): Promise<string[]> {
    const currentRoom = await this._redisClient.get(roomId);
    if (!currentRoom) {
      return [];
    }
    const roomClients: string[] = JSON.parse(currentRoom);
    return roomClients || [];
  }
}
