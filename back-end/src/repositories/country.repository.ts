import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Country, CountryRelations} from '../models';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.cid,
  CountryRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Country, dataSource);
  }
}
