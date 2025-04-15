import { NestFactory } from '@nestjs/core';
import { MyAppModule } from './my-app.module';

async function bootstrap() {
  const app = await NestFactory.create(MyAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error to start the application:', err);
  process.exit(1);
});
