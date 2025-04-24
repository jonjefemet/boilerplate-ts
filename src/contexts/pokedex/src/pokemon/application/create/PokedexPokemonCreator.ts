import PokedexPokemonRepository from '../../domain/PokedexPokemonRepository';
import {
  PokedexPokemon,
  PokedexPokemonProps,
} from '../../domain/PokedexPokemon';
import Log from '@utils/decorators/Log';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PokedexPokemonCreator {
  constructor(private readonly repository: PokedexPokemonRepository) {}

  @Log()
  async create(props: PokedexPokemonCreatorProps) {
    const pokedexPokemon = PokedexPokemon.create(props);

    return await this.repository.save(pokedexPokemon);
  }
}

type PokedexPokemonCreatorProps = PokedexPokemonProps;
