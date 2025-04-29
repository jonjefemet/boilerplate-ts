import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@shared/domain/bus/command/CommandBus';
import { CommandHandler } from '@shared/domain/bus/command/CommandHandler';
import { DiscoveryService } from '@nestjs/core';
import { COMMAND_HANDLER_META } from '@shared/infrastructure/decorators/command-handler.decorator';

type Constructorable<T = any> = new (...args: any[]) => T;
/**
 * In‑memory implementation of the Command Bus.
 * Register this class (and all your CommandHandlers) as providers
 * inside any NestJS module and simply inject `CommandBus`
 * wherever you need to dispatch commands.
 */
@Injectable()
export class InMemoryCommandBus implements CommandBus, OnModuleInit {
  private readonly handlers = new Map<string, CommandHandler>();

  constructor(private readonly discovery: DiscoveryService) {}

  onModuleInit(): void {
    const providers = this.discovery.getProviders();

    providers
      .filter((w) => {
        const inst = w.instance as Constructorable | undefined;
        return (
          inst && Reflect.hasMetadata(COMMAND_HANDLER_META, inst.constructor)
        );
      })
      .forEach((w) => {
        const handler = w.instance as CommandHandler & Constructorable;
        const command = Reflect.getMetadata(
          COMMAND_HANDLER_META,
          handler.constructor,
        ) as { name: string };
        this.handlers.set(command.name, handler);
      });
  }

  async dispatch(command: object): Promise<void> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) throw new Error(`No handler for ${command.constructor.name}`);
    await handler.handle(command);
  }
}
