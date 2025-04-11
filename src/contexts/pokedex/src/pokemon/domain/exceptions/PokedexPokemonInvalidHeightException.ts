import DomainException from '@shared/domain/exception/DomainException';

export default class PokedexPokemonInvalidHeightException extends DomainException {
  constructor(value: number) {
    super({
      code: 'INVALID_POKEDEX_POKEMON_HEIGHT',
      message: `Invalid Pokedex Pokemon height: ${value}`,
    });
  }
}
