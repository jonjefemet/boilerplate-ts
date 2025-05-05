import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  POKEDEX_MONGO_URI: Joi.string().uri().required(),
  POKEDEX_DB_NAME: Joi.string().default('pokedex'),
  POKEDEX_DB_USER: Joi.string(),
  POKEDEX_DB_PASS: Joi.string(),
});
