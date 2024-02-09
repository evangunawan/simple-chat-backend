import { ChatRoomSession } from '../entity/chat-room-session';

export interface RoomChatTokenRepository {
  saveRoomChatToken(token: string, payload: ChatRoomSession): Promise<void>;
  getRoomDetails(token: string): Promise<ChatRoomSession>;
  destroy(token: string): Promise<void>;
}
