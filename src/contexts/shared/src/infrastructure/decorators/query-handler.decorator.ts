import 'reflect-metadata';

export const QUERY_HANDLER_META = Symbol('QUERY_HANDLER_META');

export function DecoratorQueryHandler(
  query: new (...args: any[]) => any,
): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(QUERY_HANDLER_META, query, target);
  };
}
