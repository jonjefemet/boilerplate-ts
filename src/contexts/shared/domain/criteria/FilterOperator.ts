import { Operators } from '@utils/constant/Operators';
import { EnumValueObject } from '../value_object/EnumValueObject';

export default class FilterOperator extends EnumValueObject<Operators> {
  constructor(value: Operators) {
    super(value, Operators);
  }

  static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operators)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  public isPositive(): boolean {
    return (
      this.valueOf() !== Operators.NOT_EQUAL &&
      this.valueOf() !== Operators.NOT_CONTAINS
    );
  }

  protected throwErrorForInvalidValue(): void {
    throw new Error(`The filter operator ${this.valueOf()} is invalid`);
  }

  static equal() {
    return this.fromValue(Operators.EQUAL);
  }
}
