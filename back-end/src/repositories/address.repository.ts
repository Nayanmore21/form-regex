import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Address, AddressRelations} from '../models';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.aid,
  AddressRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Address, dataSource);
  }
}
