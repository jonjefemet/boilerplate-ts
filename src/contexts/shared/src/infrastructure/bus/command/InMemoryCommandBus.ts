import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@shared/domain/bus/command/CommandBus';
import { Command } from '@shared/domain/bus/command/Command';
import { CommandHandler } from '@shared/domain/bus/command/CommandHandler';

/**
 * In‑memory implementation of the Command Bus.
 * Register this class (and all your CommandHandlers) as providers
 * inside any NestJS module and simply inject `CommandBus`
 * wherever you need to dispatch commands.
 */
@Injectable()
export default class InMemoryCommandBus implements CommandBus {
  private readonly logger = new Logger(InMemoryCommandBus.name);
  private readonly handlerMap: Map<Command, CommandHandler<Command>> =
    new Map();

  /**
   * All concrete CommandHandlers are injected automatically by NestJS.
   * We build an internal lookup table (commandName → handler) once
   * at application bootstrap.
   */
  constructor(handlers: CommandHandler<Command>[]) {
    handlers.forEach((handler) => {
      this.handlerMap.set(handler.subscribedTo(), handler);
    });
  }

  /**
   * Dispatches a command to the appropriate handler.
   *
   * @throws Error if no handler is registered for the given command.
   */
  async dispatch(command: Command): Promise<void> {
    const handler = this.handlerMap.get(command.constructor.name);

    if (!handler) {
      throw new Error(
        `No CommandHandler registered for ${command.constructor.name}`,
      );
    }

    this.logger.debug(`Dispatching ${command.constructor.name}`);
    await handler.handle(command);
  }
}
