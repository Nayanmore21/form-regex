import {Entity, model, property} from '@loopback/repository';

@model()
export class Twomobile extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  tid?: number;

  @property({
    type: 'number',
  })
  mobile1?: number;

  @property({
    type: 'number',
  })
  mobile2?: number;


  constructor(data?: Partial<Twomobile>) {
    super(data);
  }
}

export interface TwomobileRelations {
  // describe navigational properties here
}

export type TwomobileWithRelations = Twomobile & TwomobileRelations;
