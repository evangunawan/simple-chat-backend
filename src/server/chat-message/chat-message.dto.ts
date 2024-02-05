import { IsString } from 'class-validator';
import { ChatMessage } from '../../app/entity/chat-message';

export class ChatMessageDto {
  @IsString()
  content: string;

  @IsString()
  clientId: string;
}
