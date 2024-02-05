export interface MessagePublisher {
  publish(queue: string, body: string): void;
}
