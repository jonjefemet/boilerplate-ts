import { ExceptionCategory } from '@utils/constant/ExceptionCategory';

export interface ExceptionMessage {
  code: string;
  type?: string;
  category: ExceptionCategory;
  description?: string;
}

export interface ResponseException {
  Exceptions: ExceptionMessage[];
  stack?: string;
}
