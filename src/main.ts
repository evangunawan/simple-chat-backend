import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
import * as dotenv from 'dotenv';

import { RabbitMQInstance } from './infrastructure/provider/rabbitmq.connection';

dotenv.config();

async function bootstrap() {
  await RabbitMQInstance.initConnection(process.env.RABBITMQ_CONNECTION);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('common'));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
