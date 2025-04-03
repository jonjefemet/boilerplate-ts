import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('hello')
  getHello(): string {
    return this.pokemonService.getHello();
  }
}
