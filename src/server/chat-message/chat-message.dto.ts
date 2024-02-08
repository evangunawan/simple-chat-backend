import { IsString, Length } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  content: string;

  @IsString()
  @Length(8, 16)
  clientId: string;

  @IsString()
  roomId: string;
}
