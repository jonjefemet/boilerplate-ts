import Exception from './Exception';
import { ResponseException } from './ResponseException';

export default interface CustomError {
  exceptions: Exception[];
  name: string;
  format(): ResponseException;
  toString(): string;
}
