export interface SocketService {
  send(room: string, event: string, data: string): void;
}
