import ValueObject from './ValueObject';

export default abstract class NumberValueObject
  extends Number
  implements ValueObject<number>
{
  constructor(value: number) {
    super(value);
    this.ensureIsValid(value);
  }
  ensureIsValid(value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Invalid number value');
    }
  }
}
