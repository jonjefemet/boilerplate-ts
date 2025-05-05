import { Primitives } from '@utils/helper/Primitives';
import PokedexPokemonHeight from './PokedexPokemonHeight';
import PokedexPokemonWeight from './PokedexPokemonWeight';
import PokedexPokemonNumberPokedex from './PokedexPokemonNumberPokedex';
import PokedexPokemonDescription from './PokedexPokemonDescription';
import { Pokemon, PokemonProps } from '@pokemon/pokemon/domain/Pokemon';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import PokemonName from '@pokemon/pokemon/domain/PokemonName';
import PokemonTypes from '@pokemon/pokemon/domain/PokemonTypes';
import PokemonType from '@pokemon/pokemon/domain/PokemonType';

export class PokedexPokemon extends Pokemon {
  readonly numberPokedex: PokedexPokemonNumberPokedex;

  readonly description: PokedexPokemonDescription;

  readonly height: PokedexPokemonHeight;

  readonly weight: PokedexPokemonWeight;

  constructor(props: PokedexPokemonProps) {
    super(props);
    this.numberPokedex = props.numberPokedex;
    this.description = props.description;
    this.height = props.height;
    this.weight = props.weight;
  }

  toPrimitive(): Primitives<PokedexPokemon> {
    return {
      numberPokedex: this.numberPokedex.valueOf(),
      description: this.description.valueOf(),
      height: this.height.valueOf(),
      weight: this.weight.valueOf(),
      ...super.toPrimitive(),
    };
  }

  static create(props: PokedexPokemonProps): PokedexPokemon {
    return new PokedexPokemon(props);
  }

  static fromPrimitives(props: Primitives<PokedexPokemon>): PokedexPokemon {
    return new PokedexPokemon({
      id: new PokemonId(props.id),
      name: new PokemonName(props.name),
      types: new PokemonTypes(
        ...props.types.map((type) => PokemonType.from(type)),
      ),
      numberPokedex: new PokedexPokemonNumberPokedex(props.numberPokedex),
      description: new PokedexPokemonDescription(props.description),
      height: new PokedexPokemonHeight(props.height),
      weight: new PokedexPokemonWeight(props.weight),
    });
  }
}

export type PokedexPokemonProps = {
  numberPokedex: PokedexPokemonNumberPokedex;
  description: PokedexPokemonDescription;
  height: PokedexPokemonHeight;
  weight: PokedexPokemonWeight;
} & PokemonProps;
