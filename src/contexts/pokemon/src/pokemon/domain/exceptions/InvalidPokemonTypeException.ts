import DomainException from '@shared/domain/exception/DomainException';

export default class InvalidPokemonTypeException extends DomainException {
  constructor(value: string) {
    super({
      code: 'INVALID_POKEMON_TYPE',
      message: `Invalid Pokemon type: ${value}`,
    });
  }
}
