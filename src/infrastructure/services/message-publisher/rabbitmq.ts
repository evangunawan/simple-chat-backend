import { MessagePublisher } from '../../../app/service/message-publisher';
import { Channel, Connection } from 'amqplib';

export class RabbitMQMessagePublisher implements MessagePublisher {
  private _connection: Connection;
  private _channel: Channel;

  constructor(mqConnection: Connection) {
    this.initialize(mqConnection);
  }

  publish(queue: string, body: string): void {}

  private async initialize(conn: Connection) {
    this._connection = conn;
    this._channel = await this._connection.createChannel();
  }
}
