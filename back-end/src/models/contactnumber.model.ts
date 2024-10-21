import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactnumber extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  cid?: number;

  @property({
    type: 'number',
  })
  mobileno?: number;

  @property({
    type: 'number',
  })
  whatsappno?: number;


  constructor(data?: Partial<Contactnumber>) {
    super(data);
  }
}

export interface ContactnumberRelations {
  // describe navigational properties here
}

export type ContactnumberWithRelations = Contactnumber & ContactnumberRelations;
