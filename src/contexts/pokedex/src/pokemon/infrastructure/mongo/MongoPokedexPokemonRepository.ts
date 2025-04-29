/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { PokedexPokemon } from '@pokedex/pokemon/domain/PokedexPokemon';
import PokedexPokemonRepository from '@pokedex/pokemon/domain/PokedexPokemonRepository';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import Criteria from '@shared/domain/criteria/Criteria';
import { Model } from 'mongoose';
import { PokemonDocument } from './pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './pokemon.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MongoPokedexPokemonRepository
  implements PokedexPokemonRepository
{
  constructor(
    @InjectModel(Pokemon.name, 'pokedex')
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async search(id: PokemonId): Promise<PokedexPokemon | null> {
    return null;
  }

  async matching(criteria: Criteria): Promise<PokedexPokemon[]> {
    return [];
  }

  async save(pokemon: PokedexPokemon): Promise<void> {
    const { id, name, types, numberPokedex, description, height, weight } =
      pokemon;

    const pokemonDocument = new this.pokemonModel({
      id: id.valueOf(),
      name: name.valueOf(),
      numberPokedex: numberPokedex.valueOf(),
      description: description.valueOf(),
      height: height.valueOf(),
      weight: weight.valueOf(),
    });

    await pokemonDocument.save();
  }
}
