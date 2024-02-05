import { Channel, connect, Connection } from 'amqplib';

class RabbitMQDriver {
  private static _instance: RabbitMQDriver;

  public static get Instance(): RabbitMQDriver {
    if (!this._instance) {
      RabbitMQDriver._instance = new RabbitMQDriver();
    }
    return this._instance;
  }

  private _connection: Connection;
  private _channel: Channel;

  constructor() {}

  public async initConnection(connectionUrl: string) {
    if (this._connection) {
      return;
    }
    this._connection = await connect(connectionUrl);
    this._channel = await this._connection.createChannel();
  }

  public get connection() {
    return this._connection;
  }

  public get channel() {
    return this._channel;
  }
}

export const RabbitMQInstance = RabbitMQDriver.Instance;
