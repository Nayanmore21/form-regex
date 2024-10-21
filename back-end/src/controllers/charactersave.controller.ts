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
import {Charactersave} from '../models';
import {CharactersaveRepository} from '../repositories';

export class CharactersaveController {
  constructor(
    @repository(CharactersaveRepository)
    public charactersaveRepository : CharactersaveRepository,
  ) {}

  @post('/charactersaves')
  @response(200, {
    description: 'Charactersave model instance',
    content: {'application/json': {schema: getModelSchemaRef(Charactersave)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charactersave, {
            title: 'NewCharactersave',
            exclude: ['cid'],
          }),
        },
      },
    })
    charactersave: Omit<Charactersave, 'cid'>,
  ): Promise<Charactersave> {
    return this.charactersaveRepository.create(charactersave);
  }

  @get('/charactersaves/count')
  @response(200, {
    description: 'Charactersave model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Charactersave) where?: Where<Charactersave>,
  ): Promise<Count> {
    return this.charactersaveRepository.count(where);
  }

  @get('/charactersaves')
  @response(200, {
    description: 'Array of Charactersave model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Charactersave, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Charactersave) filter?: Filter<Charactersave>,
  ): Promise<Charactersave[]> {
    return this.charactersaveRepository.find(filter);
  }

  @patch('/charactersaves')
  @response(200, {
    description: 'Charactersave PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charactersave, {partial: true}),
        },
      },
    })
    charactersave: Charactersave,
    @param.where(Charactersave) where?: Where<Charactersave>,
  ): Promise<Count> {
    return this.charactersaveRepository.updateAll(charactersave, where);
  }

  @get('/charactersaves/{id}')
  @response(200, {
    description: 'Charactersave model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Charactersave, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Charactersave, {exclude: 'where'}) filter?: FilterExcludingWhere<Charactersave>
  ): Promise<Charactersave> {
    return this.charactersaveRepository.findById(id, filter);
  }

  @patch('/charactersaves/{id}')
  @response(204, {
    description: 'Charactersave PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Charactersave, {partial: true}),
        },
      },
    })
    charactersave: Charactersave,
  ): Promise<void> {
    await this.charactersaveRepository.updateById(id, charactersave);
  }

  @put('/charactersaves/{id}')
  @response(204, {
    description: 'Charactersave PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() charactersave: Charactersave,
  ): Promise<void> {
    await this.charactersaveRepository.replaceById(id, charactersave);
  }

  @del('/charactersaves/{id}')
  @response(204, {
    description: 'Charactersave DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.charactersaveRepository.deleteById(id);
  }
}
