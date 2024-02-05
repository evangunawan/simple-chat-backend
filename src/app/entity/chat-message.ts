export class ChatMessage {
  public content: string;
  public timestamp: number;
  public clientId: string;

  constructor() {}

  public toJSONString(): string {
    const data = {
      content: this.content,
      timestamp: this.timestamp,
      clientId: this.clientId,
    };
    return JSON.stringify(data);
  }
}
