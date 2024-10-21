import {Entity, model, property} from '@loopback/repository';

@model()
export class Emailsave extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  eid?: number;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;


  constructor(data?: Partial<Emailsave>) {
    super(data);
  }
}

export interface EmailsaveRelations {
  // describe navigational properties here
}

export type EmailsaveWithRelations = Emailsave & EmailsaveRelations;
