import { IsString } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  content: string;

  @IsString()
  clientId: string;

  @IsString()
  roomId: string;
}
