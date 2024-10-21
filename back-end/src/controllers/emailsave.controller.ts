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
import {Emailsave} from '../models';
import {EmailsaveRepository} from '../repositories';

export class EmailsaveController {
  constructor(
    @repository(EmailsaveRepository)
    public emailsaveRepository : EmailsaveRepository,
  ) {}

  @post('/emailsaves')
  @response(200, {
    description: 'Emailsave model instance',
    content: {'application/json': {schema: getModelSchemaRef(Emailsave)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emailsave, {
            title: 'NewEmailsave',
            exclude: ['eid'],
          }),
        },
      },
    })
    emailsave: Omit<Emailsave, 'eid'>,
  ): Promise<Emailsave> {
    return this.emailsaveRepository.create(emailsave);
  }

  @get('/emailsaves/count')
  @response(200, {
    description: 'Emailsave model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Emailsave) where?: Where<Emailsave>,
  ): Promise<Count> {
    return this.emailsaveRepository.count(where);
  }

  @get('/emailsaves')
  @response(200, {
    description: 'Array of Emailsave model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Emailsave, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Emailsave) filter?: Filter<Emailsave>,
  ): Promise<Emailsave[]> {
    return this.emailsaveRepository.find(filter);
  }

  @patch('/emailsaves')
  @response(200, {
    description: 'Emailsave PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emailsave, {partial: true}),
        },
      },
    })
    emailsave: Emailsave,
    @param.where(Emailsave) where?: Where<Emailsave>,
  ): Promise<Count> {
    return this.emailsaveRepository.updateAll(emailsave, where);
  }

  @get('/emailsaves/{id}')
  @response(200, {
    description: 'Emailsave model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Emailsave, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Emailsave, {exclude: 'where'}) filter?: FilterExcludingWhere<Emailsave>
  ): Promise<Emailsave> {
    return this.emailsaveRepository.findById(id, filter);
  }

  @patch('/emailsaves/{id}')
  @response(204, {
    description: 'Emailsave PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Emailsave, {partial: true}),
        },
      },
    })
    emailsave: Emailsave,
  ): Promise<void> {
    await this.emailsaveRepository.updateById(id, emailsave);
  }

  @put('/emailsaves/{id}')
  @response(204, {
    description: 'Emailsave PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() emailsave: Emailsave,
  ): Promise<void> {
    await this.emailsaveRepository.replaceById(id, emailsave);
  }

  @del('/emailsaves/{id}')
  @response(204, {
    description: 'Emailsave DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.emailsaveRepository.deleteById(id);
  }
}
