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
import {Twomobile} from '../models';
import {TwomobileRepository} from '../repositories';

export class TwomobileController {
  constructor(
    @repository(TwomobileRepository)
    public twomobileRepository : TwomobileRepository,
  ) {}

  @post('/twomobiles')
  @response(200, {
    description: 'Twomobile model instance',
    content: {'application/json': {schema: getModelSchemaRef(Twomobile)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twomobile, {
            title: 'NewTwomobile',
            exclude: ['tid'],
          }),
        },
      },
    })
    twomobile: Omit<Twomobile, 'tid'>,
  ): Promise<Twomobile> {
    return this.twomobileRepository.create(twomobile);
  }

  @get('/twomobiles/count')
  @response(200, {
    description: 'Twomobile model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Twomobile) where?: Where<Twomobile>,
  ): Promise<Count> {
    return this.twomobileRepository.count(where);
  }

  @get('/twomobiles')
  @response(200, {
    description: 'Array of Twomobile model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Twomobile, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Twomobile) filter?: Filter<Twomobile>,
  ): Promise<Twomobile[]> {
    return this.twomobileRepository.find(filter);
  }

  @patch('/twomobiles')
  @response(200, {
    description: 'Twomobile PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twomobile, {partial: true}),
        },
      },
    })
    twomobile: Twomobile,
    @param.where(Twomobile) where?: Where<Twomobile>,
  ): Promise<Count> {
    return this.twomobileRepository.updateAll(twomobile, where);
  }

  @get('/twomobiles/{id}')
  @response(200, {
    description: 'Twomobile model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Twomobile, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Twomobile, {exclude: 'where'}) filter?: FilterExcludingWhere<Twomobile>
  ): Promise<Twomobile> {
    return this.twomobileRepository.findById(id, filter);
  }

  @patch('/twomobiles/{id}')
  @response(204, {
    description: 'Twomobile PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Twomobile, {partial: true}),
        },
      },
    })
    twomobile: Twomobile,
  ): Promise<void> {
    await this.twomobileRepository.updateById(id, twomobile);
  }

  @put('/twomobiles/{id}')
  @response(204, {
    description: 'Twomobile PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() twomobile: Twomobile,
  ): Promise<void> {
    await this.twomobileRepository.replaceById(id, twomobile);
  }

  @del('/twomobiles/{id}')
  @response(204, {
    description: 'Twomobile DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.twomobileRepository.deleteById(id);
  }
}
