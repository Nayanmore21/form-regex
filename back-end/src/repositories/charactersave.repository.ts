import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Charactersave, CharactersaveRelations} from '../models';

export class CharactersaveRepository extends DefaultCrudRepository<
  Charactersave,
  typeof Charactersave.prototype.cid,
  CharactersaveRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Charactersave, dataSource);
  }
}
