import {Entity, model, property} from '@loopback/repository';

@model()
export class Charactersave extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cid?: number;

  @property({
    type: 'string',
  })
  char1?: string;

  @property({
    type: 'string',
  })
  char2?: string;

  @property({
    type: 'string',
  })
  char3?: string;


  constructor(data?: Partial<Charactersave>) {
    super(data);
  }
}

export interface CharactersaveRelations {
  // describe navigational properties here
}

export type CharactersaveWithRelations = Charactersave & CharactersaveRelations;
