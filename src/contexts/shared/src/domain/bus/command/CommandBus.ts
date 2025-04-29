import { Command } from './Command';

export abstract class CommandBus {
  abstract dispatch<C extends Command>(command: C): Promise<void>;
}
