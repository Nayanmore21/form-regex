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
import {Contactnumber} from '../models';
import {ContactnumberRepository} from '../repositories';

export class ContactnumberController {
  constructor(
    @repository(ContactnumberRepository)
    public contactnumberRepository : ContactnumberRepository,
  ) {}

  @post('/contactnumbers')
  @response(200, {
    description: 'Contactnumber model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactnumber)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactnumber, {
            title: 'NewContactnumber',
            exclude: ['cid'],
          }),
        },
      },
    })
    contactnumber: Omit<Contactnumber, 'cid'>,
  ): Promise<Contactnumber> {
    return this.contactnumberRepository.create(contactnumber);
  }

  @get('/contactnumbers/count')
  @response(200, {
    description: 'Contactnumber model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contactnumber) where?: Where<Contactnumber>,
  ): Promise<Count> {
    return this.contactnumberRepository.count(where);
  }

  @get('/contactnumbers')
  @response(200, {
    description: 'Array of Contactnumber model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactnumber, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactnumber) filter?: Filter<Contactnumber>,
  ): Promise<Contactnumber[]> {
    return this.contactnumberRepository.find(filter);
  }

  @patch('/contactnumbers')
  @response(200, {
    description: 'Contactnumber PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactnumber, {partial: true}),
        },
      },
    })
    contactnumber: Contactnumber,
    @param.where(Contactnumber) where?: Where<Contactnumber>,
  ): Promise<Count> {
    return this.contactnumberRepository.updateAll(contactnumber, where);
  }

  @get('/contactnumbers/{id}')
  @response(200, {
    description: 'Contactnumber model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactnumber, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contactnumber, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactnumber>
  ): Promise<Contactnumber> {
    return this.contactnumberRepository.findById(id, filter);
  }

  @patch('/contactnumbers/{id}')
  @response(204, {
    description: 'Contactnumber PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactnumber, {partial: true}),
        },
      },
    })
    contactnumber: Contactnumber,
  ): Promise<void> {
    await this.contactnumberRepository.updateById(id, contactnumber);
  }

  @put('/contactnumbers/{id}')
  @response(204, {
    description: 'Contactnumber PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactnumber: Contactnumber,
  ): Promise<void> {
    await this.contactnumberRepository.replaceById(id, contactnumber);
  }

  @del('/contactnumbers/{id}')
  @response(204, {
    description: 'Contactnumber DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactnumberRepository.deleteById(id);
  }
}
