import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Fullname, FullnameRelations} from '../models';

export class FullnameRepository extends DefaultCrudRepository<
  Fullname,
  typeof Fullname.prototype.id,
  FullnameRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Fullname, dataSource);
  }
}
