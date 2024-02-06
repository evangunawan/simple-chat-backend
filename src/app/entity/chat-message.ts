import { ChatRoom } from './chat-room';

export class ChatMessage {
  public content: string;
  public timestamp: number;
  public clientId: string;
  public room: ChatRoom;

  constructor() {}

  public toJSONString(): string {
    const data = {
      content: this.content,
      timestamp: this.timestamp,
      clientId: this.clientId,
      room: this.room,
    };
    return JSON.stringify(data);
  }
}
