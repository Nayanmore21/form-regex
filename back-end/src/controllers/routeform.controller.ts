import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Routeform} from '../models';
import {RouteformRepository} from '../repositories';

export class RouteformController {
  constructor(
    @repository(RouteformRepository)
    public routeformRepository : RouteformRepository,
  ) {}

  @post('/routeforms')
  @response(200, {
    description: 'Routeform model instance',
    content: {'application/json': {schema: getModelSchemaRef(Routeform)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routeform, {
            title: 'NewRouteform',
            exclude: ['id'],
          }),
        },
      },
    })
    routeform: Omit<Routeform, 'id'>,
  ): Promise<Routeform> {
    return this.routeformRepository.create(routeform);
  }

  @get('/routeforms/count')
  @response(200, {
    description: 'Routeform model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Routeform) where?: Where<Routeform>,
  ): Promise<Count> {
    return this.routeformRepository.count(where);
  }

  @get('/routeforms')
  @response(200, {
    description: 'Array of Routeform model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Routeform, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Routeform) filter?: Filter<Routeform>,
  ): Promise<Routeform[]> {
    return this.routeformRepository.find(filter);
  }

  @patch('/routeforms')
  @response(200, {
    description: 'Routeform PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routeform, {partial: true}),
        },
      },
    })
    routeform: Routeform,
    @param.where(Routeform) where?: Where<Routeform>,
  ): Promise<Count> {
    return this.routeformRepository.updateAll(routeform, where);
  }

  @get('/routeforms/{id}')
  @response(200, {
    description: 'Routeform model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Routeform, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Routeform, {exclude: 'where'}) filter?: FilterExcludingWhere<Routeform>
  ): Promise<Routeform> {
    return this.routeformRepository.findById(id, filter);
  }

  @patch('/routeforms/{id}')
  @response(204, {
    description: 'Routeform PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Routeform, {partial: true}),
        },
      },
    })
    routeform: Routeform,
  ): Promise<void> {
    await this.routeformRepository.updateById(id, routeform);
  }

  @put('/routeforms/{id}')
  @response(204, {
    description: 'Routeform PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() routeform: Routeform,
  ): Promise<void> {
    await this.routeformRepository.replaceById(id, routeform);
  }

  @del('/routeforms/{id}')
  @response(204, {
    description: 'Routeform DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.routeformRepository.deleteById(id);
  }
}
