import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { register } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  @Get()
  async getMetrics(@Res() reply: FastifyReply): Promise<void> {
    reply.header('Content-Type', register.contentType);
    reply.send(await register.metrics());
  }
}
