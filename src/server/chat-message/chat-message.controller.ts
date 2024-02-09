import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChatMessageDto } from './chat-message.dto';
import { SendChatMessageUsecase } from '../../app/usecase/chat-message/send-chat-message.usecase';

@Controller('chat-messages')
export class ChatMessageController {
  constructor(private chatMessageUseCase: SendChatMessageUsecase) {}

  @Post('/')
  public async sendMessage(@Res() res: Response, @Body() body: ChatMessageDto) {
    try {
      await this.chatMessageUseCase.sendMessage(body.content, body.token);
    } catch (e: any) {
      if (e.message === 'session-invalid') {
        return res.status(400).send('invalid session token');
      }
      return res.status(500).send();
    }
    return res.status(200).send();
  }
}
