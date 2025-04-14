import SearchPokedexPokemonQuery from "@pokedex/pokemon/application/search/SearchPokedexPokemonQuery";

export default class SearchPokedexPokemonQueryMother {
  static create(pokemonId: string): SearchPokedexPokemonQuery {
    return new SearchPokedexPokemonQuery({
      pokemonId,
    });
  }
}
