import { EnumValueObject } from '@shared/domain/value_object/EnumValueObject';
import InvalidPokemonTypeException from './exceptions/InvalidPokemonTypeException';

export const PokemonTypeEnum = {
  NORMAL: 'NORMAL',
  FIRE: 'FIRE',
  WATER: 'WATER',
  PLANT: 'PLANT',
} as const;

export type PokemonTypeEnum =
  (typeof PokemonTypeEnum)[keyof typeof PokemonTypeEnum];

export default class PokemonType extends EnumValueObject<PokemonTypeEnum> {
  constructor(value: PokemonTypeEnum) {
    super(value, PokemonTypeEnum);
  }
  protected throwErrorForInvalidValue(): void {
    throw new InvalidPokemonTypeException(this.valueOf());
  }

  public static from(value: string): PokemonType {
    return new PokemonType(value as PokemonTypeEnum);
  }
}
