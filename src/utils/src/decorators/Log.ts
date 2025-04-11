/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Logger from '../log/Logger';
import { v4 as uuid } from 'uuid';

const MAX_LENGTH_DATA = 250;

function responseAdapter(data: unknown): string {
  if (!data) return 'void';

  let dataLabel = JSON.stringify(data);

  if (dataLabel.length > MAX_LENGTH_DATA) {
    dataLabel =
      dataLabel.slice(0, MAX_LENGTH_DATA - 1) +
      `... ${dataLabel.length - MAX_LENGTH_DATA} more characters`;
  }

  return dataLabel;
}

export default function Log() {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<
      (...args: unknown[]) => Promise<unknown>
    >,
  ) {
    const targetMethod = descriptor.value as (
      ...args: unknown[]
    ) => Promise<unknown>;
    descriptor.value = async function (...args: unknown[]) {
      const id = uuid();
      const className = `${target.constructor.name}`;
      const methodId = `${propertyKey} - ${id}`;
      const resourceName = `${className}.${methodId}`;

      Logger.run(resourceName);
      Logger.info(`${resourceName} - Params`);

      for (const argIndex in args) {
        Logger.log(
          `Param - ${parseInt(argIndex) + 1} ~`,
          responseAdapter(args[argIndex]),
        );
      }

      Logger.time(resourceName);
      const result: unknown = await targetMethod.apply(this, args);
      Logger.timeEnd(resourceName);
      Logger.info(`${resourceName} ~ Returns\n\t`, responseAdapter(result));
      Logger.done(resourceName);

      return result;
    };
  };
}
