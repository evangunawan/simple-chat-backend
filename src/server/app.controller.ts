import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get('/')
  public index(@Req() req: Request): void {
    req.res.status(404);
    return;
  }

  @Get('/health')
  public healthcheck(@Req() req: Request): void {
    req.res.status(200).json({
      status: 'OK',
    });
    return;
  }
}
