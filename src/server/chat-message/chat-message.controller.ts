import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChatMessageDto } from './chat-message.dto';
import { ChatMessageUsecase } from '../../app/usecase/chat-message/chat-message.usecase';
import { ChatMessage } from '../../app/entity/chat-message';

@Controller('chat-messages')
export class ChatMessageController {
  constructor(private chatMessageUseCase: ChatMessageUsecase) {}

  @Post('/')
  public async sendMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ChatMessageDto,
  ) {
    const message: ChatMessage = new ChatMessage();
    message.content = body.content;
    message.clientId = body.clientId;

    await this.chatMessageUseCase.sendMessage(message);

    return res.status(200).send();
  }
}
