export interface MessagePublisher {
  publish(queue: string, body: string): Promise<boolean>;
}
