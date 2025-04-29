import { Command } from './Command';

export interface CommandHandler<C extends Command = Command> {
  subscribedTo(): new (...args: any[]) => C;
  handle(command: C): Promise<void>;
}
