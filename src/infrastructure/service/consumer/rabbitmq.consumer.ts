import { Injectable } from '@nestjs/common';
import { Channel, ConsumeMessage } from 'amqplib';

@Injectable()
export class RabbitMQMessageConsumerService {
  private _channel: Channel;

  constructor(channel: Channel) {
    this._channel = channel;
  }

  public async consume(queue: string, fn: (message: ConsumeMessage) => Promise<boolean>) {
    await this._channel.assertQueue(queue, { durable: true });
    await this._channel.consume(
      queue,
      async (msg: ConsumeMessage) => {
        try {
          const result = await fn(msg);
          if (result == true) {
            this._channel.ack(msg);
          } else {
            this._channel.nack(msg);
          }
        } catch (e) {
          console.error('Error consuming:' + e);
          this._channel.nack(msg);
        }
      },
      {},
    );
  }
}
