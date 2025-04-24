import Joi from 'joi';

export const envValidationSchema = Joi.object({
  /*  Genéricas  */
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  /*  Pokedex DB  */
  POKEDEX_MONGO_URI: Joi.string().uri().required(),
  POKEDEX_DB_NAME: Joi.string().default('pokedex'),
  POKEDEX_DB_USER: Joi.string(),
  POKEDEX_DB_PASS: Joi.string(),

  /*  …otras conexiones… */
});
