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

  public static parse(val: string): ChatMessage {
    let parsed: Record<string, any>;
    try {
      parsed = JSON.parse(val);
    } catch (e) {
      throw e;
    }

    const res = new ChatMessage();
    res.content = parsed['content'];
    res.timestamp = parsed['timestamp'];
    res.clientId = parsed['clientId'];

    if (parsed.room) {
      res.room = new ChatRoom();
      res.room.roomId = parsed.room.roomId;
    }
    return res;
  }
}
