import ValueObject from './ValueObject';

export default abstract class DateValueObject
  extends Date
  implements ValueObject<Date>
{
  constructor(value: Date) {
    super(value);
    this.ensureIsValid(value);
  }
  ensureIsValid(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('Invalid date value');
    }
  }
}
