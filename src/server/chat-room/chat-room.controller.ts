import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetRoomClientsUsecase } from '../../app/usecase/chat-room/get-room-clients.usecase';
import { GenerateChatTokenDto } from './chat-room.dto';
import { GenerateRoomChatTokenUsecase } from '../../app/usecase/chat-room/generate-room-chat-token.usecase';

@Controller('chat-rooms')
export class ChatRoomController {
  constructor(
    private getRoomClientsUsecase: GetRoomClientsUsecase,
    private generateRoomTokenUsecase: GenerateRoomChatTokenUsecase,
  ) {}

  @Get('/:roomId/clients')
  public async getRoomClients(@Param('roomId') roomId: string, @Res() res: Response) {
    const clients = await this.getRoomClientsUsecase.getClients(roomId);
    return res.status(200).json({
      clients,
    });
  }

  @Post('/:roomId/chat-token')
  public async generateChatToken(
    @Param('roomId') roomId: string,
    @Body() body: GenerateChatTokenDto,
    @Res() res: Response,
  ) {
    const token = await this.generateRoomTokenUsecase.generateRoomChatToken({
      roomId,
      clientId: body.clientId,
    });

    return res.status(200).json({
      token,
    });
  }
}
