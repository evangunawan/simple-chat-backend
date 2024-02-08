import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetRoomClientsUsecase } from '../../app/usecase/chat-room/get-room-clients.usecase';

@Controller('chat-rooms')
export class ChatRoomController {
  constructor(private getRoomClientsUsecase: GetRoomClientsUsecase) {}

  @Get('/:roomId/clients')
  public async getRoomClients(@Param('roomId') roomId: string, @Res() res: Response) {
    const clients = await this.getRoomClientsUsecase.getClients(roomId);
    return res.status(200).json({
      clients,
    });
  }
}
