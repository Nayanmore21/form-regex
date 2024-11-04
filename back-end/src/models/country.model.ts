import {Entity, model, property} from '@loopback/repository';

@model()
export class Country extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cid?: number;

  @property({
    type: 'string',
  })
  countryName?: string;

  @property({
    type: 'string',
  })
  cvalue?: string;


  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
