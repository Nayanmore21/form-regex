import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Contactnumber, ContactnumberRelations} from '../models';

export class ContactnumberRepository extends DefaultCrudRepository<
  Contactnumber,
  typeof Contactnumber.prototype.cid,
  ContactnumberRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Contactnumber, dataSource);
  }
}
