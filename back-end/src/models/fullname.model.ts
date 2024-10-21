import {Entity, model, property} from '@loopback/repository';

@model()
export class Fullname extends Entity {
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
  firstname: string;

  @property({
    type: 'string',
  })
  lastname?: string;


  constructor(data?: Partial<Fullname>) {
    super(data);
  }
}

export interface FullnameRelations {
  // describe navigational properties here
}

export type FullnameWithRelations = Fullname & FullnameRelations;
