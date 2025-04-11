import { ExceptionCategory } from '@utils/constant/ExceptionCategory';
import { CustomExceptionAbstractFactory } from '@utils/exception/CustomExceptionAbstractFactory';

export default class DomainException extends CustomExceptionAbstractFactory {
  protected category: ExceptionCategory = ExceptionCategory.DOMAIN;
  name: string = 'DomainException';
}
