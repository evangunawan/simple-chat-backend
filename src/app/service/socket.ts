export interface SocketService {
  send(room: string, data: string): void;
}
