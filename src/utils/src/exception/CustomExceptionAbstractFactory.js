"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomExceptionAbstractFactory = void 0;
const common_1 = require("@nestjs/common");
class CustomExceptionAbstractFactory extends common_1.HttpException {
    exceptions = [];
    constructor(exceptions, httpStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        super('', httpStatus);
        if (Array.isArray(exceptions)) {
            this.exceptions = exceptions;
        }
        else {
            this.exceptions = [exceptions];
        }
    }
    formatStackTrace() {
        const stackLines = this.stack?.split('\n');
        if (stackLines && stackLines.length > 0) {
            return stackLines
                .filter((line) => !line.includes('node_modules'))
                .join('\n');
        }
        return this.stack || '';
    }
    toString() {
        return `${this.name}: ${this.message}\n${this.formatStackTrace()}`;
    }
    format() {
        const Exceptions = this.exceptions.map((exception) => ({
            code: exception.code,
            type: this.name,
            category: this.category,
            description: exception.message,
        }));
        return {
            Exceptions,
            stack: process.env.NODE_ENV === 'development'
                ? this.formatStackTrace()
                : undefined,
        };
    }
    getResponse() {
        return this.format();
    }
}
exports.CustomExceptionAbstractFactory = CustomExceptionAbstractFactory;
//# sourceMappingURL=CustomExceptionAbstractFactory.js.map