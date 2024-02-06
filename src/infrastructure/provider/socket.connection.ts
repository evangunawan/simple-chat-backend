import * as io from 'socket.io';

class SocketConnection {
  private static _instance: SocketConnection;

  public static get Instance(): SocketConnection {
    if (!this._instance) {
      SocketConnection._instance = new SocketConnection();
    }
    return this._instance;
  }

  private _server: io.Server;

  public get server(): io.Server {
    return this._server;
  }

  public setServer(server: io.Server): io.Server {
    if (this._server !== undefined) {
      return this._server;
    }
    this._server = server;
    return this._server;
  }
}

export const SocketConnectionInstance = SocketConnection.Instance;
