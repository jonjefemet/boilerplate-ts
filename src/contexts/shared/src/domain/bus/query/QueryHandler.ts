import { Query } from './Query';
import { Response } from './Response';

export interface QueryHandler<Q extends Query, R extends Response | null> {
  subscribedTo(): Query;
  handle(query: Q): Promise<R>;
}
