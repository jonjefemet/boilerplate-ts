/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { PokedexPokemon } from '@pokedex/pokemon/domain/PokedexPokemon';
import PokedexPokemonRepository from '@pokedex/pokemon/domain/PokedexPokemonRepository';
import PokemonId from '@pokemon/pokemon/domain/PokemonId';
import Criteria from '@shared/domain/criteria/Criteria';
import { Model } from 'mongoose';
import { PokemonDocument, Pokemon } from './pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';
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
    const pokemonDocument = await this.pokemonModel.findById(id.valueOf());

    if (!pokemonDocument) {
      return null;
    }

    return PokedexPokemon.fromPrimitives({
      id: pokemonDocument._id,
      name: pokemonDocument.name,
      types: pokemonDocument.types,
      numberPokedex: pokemonDocument.numberPokedex,
      description: pokemonDocument.description,
      height: pokemonDocument.height,
      weight: pokemonDocument.weight,
    });
  }

  async matching(criteria: Criteria): Promise<PokedexPokemon[]> {
    return [];
  }

  async save(pokemon: PokedexPokemon): Promise<void> {
    const { id, name, types, numberPokedex, description, height, weight } =
      pokemon.toPrimitive();
    const pokemonDocument = new this.pokemonModel({
      _id: id,
      name,
      types,
      numberPokedex,
      description,
      height,
      weight,
    });

    await pokemonDocument.save();
  }
}
