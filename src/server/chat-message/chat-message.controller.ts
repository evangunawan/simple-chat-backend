import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatMessageDto } from './chat-message.dto';
import { SendChatMessageUsecase } from '../../app/usecase/chat-message/send-chat-message.usecase';
import { ChatMessage } from '../../app/entity/chat-message';
import { ChatRoom } from 'src/app/entity/chat-room';

@Controller('chat-messages')
export class ChatMessageController {
  constructor(private chatMessageUseCase: SendChatMessageUsecase) {}

  @Post('/')
  public async sendMessage(@Res() res: Response, @Body() body: ChatMessageDto) {
    const message: ChatMessage = new ChatMessage();
    message.content = body.content;
    message.clientId = body.clientId;
    message.room = new ChatRoom(body.roomId);

    await this.chatMessageUseCase.sendMessage(message);

    return res.status(200).send();
  }
}
