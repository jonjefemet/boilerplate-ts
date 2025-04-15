// health-metrics/health.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Gauge, Histogram } from 'prom-client';

const healthGauge = new Gauge({
  name: 'app_health_status',
  help: 'Estado de salud de la aplicación (1 = UP, 0 = DOWN)',
});

const healthCheckLatency = new Histogram({
  name: 'app_health_check_latency_seconds',
  help: 'Latencia en segundos del health check',
  buckets: [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5],
});

@Controller('health')
export class HealthController {
  @Get()
  checkHealth(@Res() reply: FastifyReply): void {
    const endTimer = healthCheckLatency.startTimer();

    try {
      healthGauge.set(1);
      reply.code(200).send({ status: 'UP' });
    } catch (error) {
      console.error('Error en la verificación de salud:', error);
      healthGauge.set(0);
      reply.code(503).send({ status: 'DOWN' });
    } finally {
      endTimer();
    }
  }
}
