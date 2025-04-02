import ValueObject from './ValueObject';

export default abstract class StringValueObject
  extends String
  implements ValueObject<string>
{
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }
  ensureIsValid(value: string): void {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new Error('Invalid string value');
    }
  }
}
