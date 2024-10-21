import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Twomobile, TwomobileRelations} from '../models';

export class TwomobileRepository extends DefaultCrudRepository<
  Twomobile,
  typeof Twomobile.prototype.tid,
  TwomobileRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Twomobile, dataSource);
  }
}
