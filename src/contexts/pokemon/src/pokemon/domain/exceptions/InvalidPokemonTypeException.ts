import DomainObjectException from '@shared/domain/exception/DomainObjectException';

export default class InvalidPokemonTypeException extends DomainObjectException {
  constructor(value: string) {
    super({
      code: 'INVALID_POKEMON_TYPE',
      message: `Invalid Pokemon type: ${value}`,
    });
  }
}
