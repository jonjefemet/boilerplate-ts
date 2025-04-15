import { Module } from '@nestjs/common';
import { HealthController } from './health-metrics/health.controller';
import { MetricsController } from './health-metrics/metrics.controller';

@Module({
  controllers: [HealthController, MetricsController],
})
export class AppModule {}
