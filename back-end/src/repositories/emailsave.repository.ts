import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Emailsave, EmailsaveRelations} from '../models';

export class EmailsaveRepository extends DefaultCrudRepository<
  Emailsave,
  typeof Emailsave.prototype.eid,
  EmailsaveRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Emailsave, dataSource);
  }
}
