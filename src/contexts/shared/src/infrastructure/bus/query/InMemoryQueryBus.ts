import { Injectable, OnModuleInit } from '@nestjs/common';
import { QueryBus } from '@shared/domain/bus/query/QueryBus';
import { QueryHandler } from '@shared/domain/bus/query/QueryHandler';
import { DiscoveryService } from '@nestjs/core';
import { QUERY_HANDLER_META } from '@shared/infrastructure/decorators/query-handler.decorator';

type Constructorable<T = any> = new (...args: any[]) => T;

/**
 * In‑memory implementation of the Query Bus.
 * Register this class (and all your QueryHandlers) as providers
 * inside any NestJS module and simply inject `QueryBus`
 * wherever you need to ask queries.
 */
@Injectable()
export class InMemoryQueryBus implements QueryBus, OnModuleInit {
  private readonly handlers = new Map<string, QueryHandler<any, any>>();

  constructor(private readonly discovery: DiscoveryService) {}

  onModuleInit(): void {
    const providers = this.discovery.getProviders();
    providers
      .filter((w) => {
        const inst = w.instance as Constructorable | undefined;

        return (
          inst && Reflect.hasMetadata(QUERY_HANDLER_META, inst.constructor)
        );
      })
      .forEach((w) => {
        const handler = w.instance as QueryHandler<any, any> & Constructorable;
        const query = Reflect.getMetadata(
          QUERY_HANDLER_META,
          handler.constructor,
        ) as { name: string };
        this.handlers.set(query.name, handler);
      });
  }

  async ask<R>(query: object): Promise<R> {
    const handler = this.handlers.get(query.constructor.name) as QueryHandler<
      any,
      any
    >;
    if (!handler) throw new Error(`No handler for ${query.constructor.name}`);
    // The handler's `handle` method should return a Promise<R>
    return (await handler.handle(query)) as unknown as R;
  }
}
