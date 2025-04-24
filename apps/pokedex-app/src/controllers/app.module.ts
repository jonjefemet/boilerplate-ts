import { Module } from '@nestjs/common';
import { HealthController } from './health-metrics/health.controller';
import { MetricsController } from './health-metrics/metrics.controller';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'apps/pokedex-app/src/controllers/config/pokedex.env.validation';
import pokedexConfig from '@pokedex/config/pokedex.config';
import { PokedexModule } from '@pokedex/pokedex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`, '.env.local'],
      validationSchema: envValidationSchema,
      load: [pokedexConfig],
    }),
    PokedexModule,
  ],
  controllers: [HealthController, MetricsController],
})
export class AppModule {}
