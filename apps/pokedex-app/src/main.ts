import { NestFactory } from '@nestjs/core';
import * as client from 'prom-client';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  client.collectDefaultMetrics();
  await app.listen(process.env.port ?? 3000, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error al iniciar la aplicación:', err);
  process.exit(1);
});
