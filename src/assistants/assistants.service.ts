import { Inject, Injectable } from '@nestjs/common/decorators';

import { Assistants } from './assistants.entity';
import { ViacepApi } from 'src/api/viacepApi';
import { CreateAssistantDto } from './assistants.dtos';
import { generatePassword } from 'src/utils/functions';
import { UsersService } from 'src/users/users.service';
import { Op } from 'sequelize';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';

@Injectable()
export class AssistantsService {
  constructor(
    @Inject('assistants') private assistantsRepo: typeof Assistants,
    private userService: UsersService,
    private viacepApi: ViacepApi,
  ) {}

  async createAssistant(dto: CreateAssistantDto) {
    const cepRequest = await this.viacepApi.getCep(dto.cep);
    if (cepRequest.error) {
      throw new BadRequestException(cepRequest.error.message);
    }
    const userCheck = await this.assistantsRepo.count({
      where: {
        [Op.or]: [{ Email: dto.cep }, { Cnpj_Cpf: dto.cnpj_cpf }],
      },
    });
    if (userCheck)
      throw new UnprocessableEntityException(
        'E-mail ou CPF/CNPJ já existente na base de dados',
      );
    const { password, salt } = await generatePassword(dto.password);
    const userCreation = {
      Name: dto.name,
      RoleId: 2,
      Email: dto.email,
      AvatarLink: null,
      Salt: salt,
      Hash: password,
      CreatedAt: new Date().toISOString(),
    };

    const userCreated = await this.userService.createUser(userCreation);

    const creation = {
      Cnpj_Cpf: dto.cnpj_cpf,
      Email: dto.email,
      Name: userCreated.Name,
      Phone: dto.phone,
      Cep: dto.cep,
      UserId: userCreated.dataValues.User_Id,
    };

    const assistant = await this.assistantsRepo.create(creation);

    return assistant;
  }
}
