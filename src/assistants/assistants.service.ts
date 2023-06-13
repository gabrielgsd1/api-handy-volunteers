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
import { uuid } from 'uuidv4';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AssistantsService {
  constructor(
    @Inject('assistants') private assistantsRepo: typeof Assistants,
    private rolesService: RolesService,
    private userService: UsersService,
    private viacepApi: ViacepApi,
  ) {}

  async createAssistant(dto: CreateAssistantDto) {
    const userCheck = await this.assistantsRepo.count({
      where: {
        [Op.or]: [{ Email: dto.email }, { Cnpj_Cpf: dto.cnpj_cpf }],
      },
    });
    if (userCheck)
      throw new UnprocessableEntityException(
        'E-mail ou CPF/CNPJ já existente na base de dados',
      );

    const { password, salt } = await generatePassword(dto.password);
    const roleId = await this.rolesService.getAssistantRoleId();
    const userCreation = {
      User_Id: uuid(),
      Name: dto.name,
      RoleId: roleId,
      Email: dto.email,
      AvatarLink: null,
      Salt: salt,
      Hash: password,
    };

    const userCreated = await this.userService.createUser(userCreation);

    const creation = {
      Cnpj_Cpf: dto.cnpj_cpf,
      Email: dto.email,
      Name: userCreated.Name,
      Phone: dto.phone,
      UserId: userCreated.dataValues.User_Id,
    };

    console.log(userCreated);

    const assistant = await this.assistantsRepo.create(creation);

    return assistant;
  }

  async getAssistants() {
    return await this.assistantsRepo.findAll();
  }

  async getAssistantById(id: number) {
    return await this.assistantsRepo.findOne({ where: { AssistantId: id } });
  }
}
