import { registerAs } from '@nestjs/config';

export default registerAs('pokemon', () => ({
  apiUrl: process.env.POKEMON_API_URL || 'https://pokeapi.co/api/v2',
  cacheTtl: parseInt(process.env.POKEMON_CACHE_TTL || '3600', 10),
}));
