import DomainException from '@shared/domain/exception/DomainException';

export default class PokedexPokemonInvalidWeightException extends DomainException {
  constructor(value: number) {
    super({
      code: 'INVALID_POKEDEX_POKEMON_WEIGHT',
      message: `Invalid Pokedex Pokemon weight: ${value}`,
    });
  }
}
