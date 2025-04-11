import PokemonSearcherRepository from '@pokemon/pokemon/domain/PokemonSearcherRepository';
import { PokedexPokemon } from './PokedexPokemon';
import PokemonCriteriaSearcherRepository from '@pokemon/pokemon/domain/PokemonCriteriaSearcherRepository';
import PokemonCreatorRepository from '@pokemon/pokemon/domain/PokemonCreatorRepository';

export default interface PokedexPokemonRepository
  extends PokemonSearcherRepository<PokedexPokemon>,
    PokemonCriteriaSearcherRepository<PokedexPokemon>,
    PokemonCreatorRepository<PokedexPokemon> {}
