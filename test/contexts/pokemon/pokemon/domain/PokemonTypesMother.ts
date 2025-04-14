import PokemonType, {
  PokemonTypeEnum,
} from '@pokemon/pokemon/domain/PokemonType';
import PokemonTypes from '@pokemon/pokemon/domain/PokemonTypes';
import { secureRandom } from '@utils/helper/Random';

export default class PokemonTypesMother {
  static random(): PokemonTypes {
    const types = Object.values(PokemonTypeEnum);
    const shuffled = types.toSorted(() => 0.5 - secureRandom());
    const selectedTypes = shuffled.slice(0, 2);

    return PokemonTypesMother.create(
      selectedTypes.map((type) => PokemonType.from(type)),
    );
  }

  static create(value: PokemonType[]): PokemonTypes {
    return new PokemonTypes(...value);
  }

  static invalid(): PokemonTypes {
    return PokemonTypesMother.create([PokemonType.from('INVALID')]);
  }

  static repeated(): PokemonTypes {
    return PokemonTypesMother.create([
      PokemonType.from(PokemonTypeEnum.FIRE),
      PokemonType.from(PokemonTypeEnum.FIRE),
    ]);
  }
}
