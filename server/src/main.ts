import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  });
  
  const port = process.env.PORT ? Number(process.env.PORT) : 5005;
  await app.listen(port);
}

bootstrap();