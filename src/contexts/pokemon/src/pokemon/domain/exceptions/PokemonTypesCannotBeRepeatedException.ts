import DomainObjectException from '@shared/domain/exception/DomainObjectException';

export default class PokemonTypesCannotBeRepeatedException extends DomainObjectException {
  constructor() {
    super({
      code: 'POKEMON_TYPES_CANNOT_BE_REPEATED',
      message: `Pokemon types cannot be repeated`,
    });
  }
}
