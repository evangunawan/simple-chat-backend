import { MessagePublisher } from '../../../app/service/message-publisher';
import { Channel } from 'amqplib';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQMessagePublisherService implements MessagePublisher {
  private _channel: Channel;

  constructor(channel: Channel) {
    this._channel = channel;
  }

  public async publish(queue: string, body: string): Promise<boolean> {
    await this._channel.assertQueue(queue, { durable: true });
    return this._channel.sendToQueue(queue, Buffer.from(body, 'utf8'));
  }
}
