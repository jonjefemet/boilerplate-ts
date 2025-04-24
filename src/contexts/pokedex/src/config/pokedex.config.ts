import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  pokedex: {
    uri: process.env.POKEDEX_MONGO_URI,
    dbName: process.env.POKEDEX_DB_NAME ?? 'pokedex',
    user: process.env.POKEDEX_DB_USER,
    pass: process.env.POKEDEX_DB_PASS,
  },
}));
