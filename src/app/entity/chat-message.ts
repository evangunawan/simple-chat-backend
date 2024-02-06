export class ChatMessage {
  public content: string;
  public timestamp: number;
  public clientId: string;
  public roomId: string;

  constructor() {}

  public toJSONString(): string {
    const data = {
      content: this.content,
      timestamp: this.timestamp,
      clientId: this.clientId,
      roomId: this.roomId,
    };
    return JSON.stringify(data);
  }
}
