export class ChatRoom {
  public roomId: string;
  public createdAt: number;

  constructor(roomId?: string) {
    this.roomId = roomId;
  }
}
