import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PracticedsDataSource} from '../datasources';
import {Routeform, RouteformRelations} from '../models';

export class RouteformRepository extends DefaultCrudRepository<
  Routeform,
  typeof Routeform.prototype.id,
  RouteformRelations
> {
  constructor(
    @inject('datasources.practiceds') dataSource: PracticedsDataSource,
  ) {
    super(Routeform, dataSource);
  }
}
