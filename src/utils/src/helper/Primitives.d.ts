import BooleanValueObject from '@shared/domain/value_object/BooleanValueObject';
import DateValueObject from '@shared/domain/value_object/DateValueObject';
import NumberValueObject from '@shared/domain/value_object/NumberValueObject';
import StringValueObject from '@shared/domain/value_object/StringValueObject';
type Methods<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
type Properties<T> = Omit<T, Methods<T>>;
type ValueObjectValue<T> = T extends StringValueObject ? string : T extends NumberValueObject ? number : T extends BooleanValueObject ? boolean : T extends DateValueObject ? Date : T extends {
    value: infer U;
} ? U : T extends Array<{
    value: infer U;
}> ? U[] : T extends Array<infer U> ? Array<ValueObjectValue<U>> : T extends object ? {
    [K in keyof Properties<T>]: ValueObjectValue<T[K]>;
} : T;
export type Primitives<T> = {
    [K in keyof Properties<T>]: ValueObjectValue<T[K]>;
};
export {};
