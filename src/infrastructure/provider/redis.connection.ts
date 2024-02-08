import { createClient } from 'redis';

export class RedisConnection {
  private static _instance: RedisConnection;

  public static get Instance(): RedisConnection {
    if (!this._instance) {
      RedisConnection._instance = new RedisConnection();
    }
    return this._instance;
  }

  private _connection: any;

  public async initConnection(connectionUrl: string) {
    if (this._connection) {
      return;
    }
    const client = createClient({ url: `${connectionUrl}`, database: 1 });
    this._connection = await client.connect();
  }

  public get client() {
    return this._connection;
  }
}

export const RedisInstance = RedisConnection.Instance;
