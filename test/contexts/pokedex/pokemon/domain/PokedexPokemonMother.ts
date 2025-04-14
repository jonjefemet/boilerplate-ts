import PokedexPokemonNumberPokedexMother from './PokedexPokemonNumberPokedexMother';
import PokedexPokemonDescriptionMother from './PokedexPokemonDescriptionMother';
import PokedexPokemonWeightMother from './PokedexPokemonWeightMother';
import PokedexPokemonHeightMother from './PokedexPokemonHeightMother';
import PokemonType from '@pokemon/pokemon/domain/PokemonType';
import { PokedexPokemon, PokedexPokemonProps } from '@pokedex/pokemon/domain/PokedexPokemon';
import CreatePokedexPokemonCommand from '@pokedex/pokemon/application/create/CreatePokedexPokemonCommand';
import PokemonIdMother from '@test/contexts/pokemon/pokemon/domain/PokemonIdMother';
import PokemonNameMother from '@test/contexts/pokemon/pokemon/domain/PokemonName';
import PokemonTypesMother from '@test/contexts/pokemon/pokemon/domain/PokemonTypesMother';

export default class PokedexPokemonMother {
  static random(): PokedexPokemon {
    return PokedexPokemonMother.create({
      id: PokemonIdMother.random(),
      name: PokemonNameMother.random(),
      types: PokemonTypesMother.random(),
      numberPokedex: PokedexPokemonNumberPokedexMother.random(),
      description: PokedexPokemonDescriptionMother.random(),
      height: PokedexPokemonHeightMother.random(),
      weight: PokedexPokemonWeightMother.random(),
    });
  }

  static create(props: PokedexPokemonProps): PokedexPokemon {
    return new PokedexPokemon(props);
  }

  static fromCommand(command: CreatePokedexPokemonCommand): PokedexPokemon {
    return PokedexPokemonMother.create({
      id: PokemonIdMother.create(command.id),
      name: PokemonNameMother.create(command.name),
      types: PokemonTypesMother.create(
        command.types.map((type) => PokemonType.from(type)),
      ),
      numberPokedex: PokedexPokemonNumberPokedexMother.create(
        command.numberPokedex,
      ),
      description: PokedexPokemonDescriptionMother.create(command.description),
      height: PokedexPokemonHeightMother.create(command.height),
      weight: PokedexPokemonWeightMother.create(command.weight),
    });
  }
}
