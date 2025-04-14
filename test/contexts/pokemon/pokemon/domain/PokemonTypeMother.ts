import PokemonType, {
  PokemonTypeEnum,
} from '@pokemon/pokemon/domain/PokemonType';

export default class PokemonTypeMother {
  static random(): PokemonType {
    const types = Object.values(PokemonTypeEnum);
    const randomType = types[Math.floor(Math.random() * types.length)];

    return PokemonTypeMother.create(randomType);
  }

  static create(value: PokemonTypeEnum): PokemonType {
    return PokemonType.from(value);
  }
}
