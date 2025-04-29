import 'reflect-metadata';

export const COMMAND_HANDLER_META = 'COMMAND_HANDLER_META';

export function DecoratorCommandHandler(
  command: new (...args: any[]) => any,
): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(COMMAND_HANDLER_META, command, target);
  };
}
