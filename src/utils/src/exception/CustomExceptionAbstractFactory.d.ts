import { HttpException, HttpStatus } from '@nestjs/common';
import CustomError from './CustomError';
import Exception from './Exception';
import { ExceptionCategory } from '../constant/ExceptionCategory';
import { ResponseException } from './ResponseError';
export declare abstract class CustomExceptionAbstractFactory extends HttpException implements CustomError {
    readonly exceptions: Exception[];
    protected abstract readonly category: ExceptionCategory;
    abstract readonly name: string;
    constructor(exceptions: Exception | Exception[], httpStatus?: HttpStatus);
    private formatStackTrace;
    toString(): string;
    format(): ResponseException;
    getResponse(): ResponseException;
}
