class RabbitMQDriver {
  private static _instance: RabbitMQDriver;
  constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export const RabbitMQInstance = RabbitMQDriver.Instance;
