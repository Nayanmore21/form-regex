import {Entity, model, property} from '@loopback/repository';

@model()
export class Routeform extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'number',
    required: true,
  })
  phoneNumber: number;

  @property({
    type: 'date',
    required: true,
  })
  dob: Date;


  constructor(data?: Partial<Routeform>) {
    super(data);
  }
}

export interface RouteformRelations {
  // describe navigational properties here
}

export type RouteformWithRelations = Routeform & RouteformRelations;
