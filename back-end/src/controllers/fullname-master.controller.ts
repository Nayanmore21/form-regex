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
import {Fullname} from '../models';
import {FullnameRepository} from '../repositories';

export class FullnameMasterController {
  constructor(
    @repository(FullnameRepository)
    public fullnameRepository : FullnameRepository,
  ) {}

  @post('/fullnames')
  @response(200, {
    description: 'Fullname model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fullname)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fullname, {
            title: 'NewFullname',
            exclude: ['id'],
          }),
        },
      },
    })
    fullname: Omit<Fullname, 'id'>,
  ): Promise<Fullname> {
    return this.fullnameRepository.create(fullname);
  }

  @get('/fullnames/count')
  @response(200, {
    description: 'Fullname model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fullname) where?: Where<Fullname>,
  ): Promise<Count> {
    return this.fullnameRepository.count(where);
  }

  @get('/fullnames')
  @response(200, {
    description: 'Array of Fullname model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fullname, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fullname) filter?: Filter<Fullname>,
  ): Promise<Fullname[]> {
    return this.fullnameRepository.find(filter);
  }

  @patch('/fullnames')
  @response(200, {
    description: 'Fullname PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fullname, {partial: true}),
        },
      },
    })
    fullname: Fullname,
    @param.where(Fullname) where?: Where<Fullname>,
  ): Promise<Count> {
    return this.fullnameRepository.updateAll(fullname, where);
  }

  @get('/fullnames/{id}')
  @response(200, {
    description: 'Fullname model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fullname, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Fullname, {exclude: 'where'}) filter?: FilterExcludingWhere<Fullname>
  ): Promise<Fullname> {
    return this.fullnameRepository.findById(id, filter);
  }

  @patch('/fullnames/{id}')
  @response(204, {
    description: 'Fullname PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fullname, {partial: true}),
        },
      },
    })
    fullname: Fullname,
  ): Promise<void> {
    await this.fullnameRepository.updateById(id, fullname);
  }

  @put('/fullnames/{id}')
  @response(204, {
    description: 'Fullname PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() fullname: Fullname,
  ): Promise<void> {
    await this.fullnameRepository.replaceById(id, fullname);
  }

  @del('/fullnames/{id}')
  @response(204, {
    description: 'Fullname DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.fullnameRepository.deleteById(id);
  }
}
