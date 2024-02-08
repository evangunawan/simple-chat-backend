export interface RoomStateRepository {
  addClientToRoom(roomId: string, clientId: string): Promise<void>;
  removeClientFromRoom(roomId: string, clientId: string): Promise<void>;
  getRoomClients(roomId: string): Promise<string[]>;
}
