import { OrderTypes } from '@utils/constant/OrderTypes';
import { EnumValueObject } from '../value_object/EnumValueObject';

export default class OrderType extends EnumValueObject<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, OrderTypes);
  }

  static fromValue(value: string): OrderType {
    for (const orderTypeValue of Object.values(OrderTypes)) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue);
      }
    }

    throw new Error(`The order type ${value} is invalid`);
  }

  public isNone(): boolean {
    return this.valueOf() === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.valueOf() === OrderTypes.ASC;
  }

  protected throwErrorForInvalidValue(): void {
    throw new Error(`The order type ${this.valueOf()} is invalid`);
  }
}
