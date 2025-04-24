import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Gauge, Histogram } from 'prom-client';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

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
  constructor(
    @InjectConnection('pokedex') private readonly dbConn: Connection,
  ) {}

  @Get()
  async checkHealth(@Res() reply: FastifyReply): Promise<void> {
    const endTimer = healthCheckLatency.startTimer();
    try {
      if (this.dbConn.db) {
        await this.dbConn.db.admin().ping();

        const collections = await this.dbConn.db
          .listCollections({}, { nameOnly: true })
          .toArray();

        if (collections.length === 0) {
          throw new Error('No se encontraron colecciones en la base de datos');
        }
      } else {
        throw new Error('La conexión a la base de datos es undefined');
      }
      healthGauge.set(1);
      reply.code(200).send({ status: 'UP', collectionsCount: 'OK' });
    } catch (error) {
      console.error('Health check FAILED:', error);
      healthGauge.set(0);
      reply.code(503).send({ status: 'DOWN', reason: 'error' });
    } finally {
      endTimer();
    }
  }
}
