export interface SocketService {
  send(room: string, event: string, data: string): void;

  joinRoom(socketId: string, roomId: string): void;

  leaveRoom(socketId: string, roomId: string): void;
}
