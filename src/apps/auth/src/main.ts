import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(3001); // Cambia el puerto si es necesario
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
