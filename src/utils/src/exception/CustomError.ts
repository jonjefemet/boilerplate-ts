import Exception from './Exception';
import { ResponseException } from './ResponseError';

export default interface CustomError {
  exceptions: Exception[];
  name: string;
  format(): ResponseException;
  toString(): string;
}
