import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema({ collection: 'pokemons', timestamps: true })
export class Pokemon {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], index: true })
  types: string[];

  @Prop({ min: 1 })
  hp: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
