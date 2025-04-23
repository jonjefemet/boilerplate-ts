import { Module } from '@nestjs/common';
import { HealthController } from './health-metrics/health.controller';
import { MetricsController } from './health-metrics/metrics.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [HealthController, MetricsController],
})
export class AppModule {}
