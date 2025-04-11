import { HttpException, HttpStatus } from '@nestjs/common';
import CustomError from './CustomException';
import Exception from './Exception';
import { ExceptionCategory } from '../constant/ExceptionCategory';
import { ResponseException } from './ResponseError';

export abstract class CustomExceptionAbstractFactory
  extends HttpException
  implements CustomError
{
  readonly exceptions: Exception[] = [];
  protected abstract readonly category: ExceptionCategory;
  abstract readonly name: string;

  constructor(
    exceptions: Exception | Exception[],
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super('', httpStatus);

    if (Array.isArray(exceptions)) {
      this.exceptions = exceptions;
    } else {
      this.exceptions = [exceptions];
    }
  }

  private formatStackTrace(): string {
    const stackLines = this.stack?.split('\n');
    if (stackLines && stackLines.length > 0) {
      return stackLines
        .filter((line: string) => !line.includes('node_modules'))
        .join('\n');
    }
    return this.stack ?? '';
  }

  toString(): string {
    return `${this.name}: ${this.message}\n${this.formatStackTrace()}`;
  }

  format(): ResponseException {
    const Exceptions = this.exceptions.map((exception) => ({
      code: exception.code,
      type: this.name,
      category: this.category,
      description: exception.message,
    }));

    return {
      Exceptions,
      stack:
        process.env.NODE_ENV === 'development'
          ? this.formatStackTrace()
          : undefined,
    };
  }

  getResponse(): ResponseException {
    return this.format();
  }
}
