import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import { RabbitMQInstance } from './infrastructure/provider/rabbitmq.connection';
import { RedisIoAdapter } from './infrastructure/adapter/redisio.adapter';
import { RedisInstance } from './infrastructure/provider/redis.connection';

dotenv.config();

async function bootstrap() {
  await RabbitMQInstance.initConnection(process.env.RABBITMQ_CONNECTION);
  await RedisInstance.initConnection(process.env.REDIS_CONNECTION);

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: '*',
  });
  app.use(morgan('common'));
  app.useGlobalPipes(new ValidationPipe());

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
