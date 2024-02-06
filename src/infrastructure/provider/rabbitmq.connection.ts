import { Channel, connect, Connection } from 'amqplib';

class RabbitmqConnection {
  private static _instance: RabbitmqConnection;

  public static get Instance(): RabbitmqConnection {
    if (!this._instance) {
      RabbitmqConnection._instance = new RabbitmqConnection();
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

export const RabbitMQInstance = RabbitmqConnection.Instance;
