import { Operator } from '@utils/constant/Operator';
import { EnumValueObject } from '../value_object/EnumValueObject';

export default class FilterOperator extends EnumValueObject<Operator> {
  constructor(value: Operator) {
    super(value, Operator);
  }

  static fromValue(value: string): FilterOperator {
    for (const operatorValue of Object.values(Operator)) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue);
      }
    }

    throw new Error(`The filter operator ${value} is invalid`);
  }

  public isPositive(): boolean {
    return (
      this.valueOf() !== Operator.NOT_EQUAL &&
      this.valueOf() !== Operator.NOT_CONTAINS
    );
  }

  protected throwErrorForInvalidValue(): void {
    throw new Error(`The filter operator ${this.valueOf()} is invalid`);
  }

  static equal() {
    return this.fromValue(Operator.EQUAL);
  }
}
