import { Query } from './Query';
import { Response } from './Response';
import { Maybe } from '@utils/helper/Type';

export interface QueryHandler<Q extends Query, R extends Maybe<Response>> {
  subscribedTo(): new (...args: any[]) => Q;
  handle(query: Q): Promise<R>;
}
