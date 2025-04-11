import DomainException from '@shared/domain/exception/DomainException';

export default class PokemonTypesCannotBeRepeatedException extends DomainException {
  constructor() {
    super({
      code: 'POKEMON_TYPES_CANNOT_BE_REPEATED',
      message: `Pokemon types cannot be repeated`,
    });
  }
}
