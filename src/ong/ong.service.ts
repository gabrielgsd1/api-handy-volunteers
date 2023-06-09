import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Ong } from './ong.entity';
import { CreateOngDto } from './ong.dtos';
import { UsersService } from 'src/users/users.service';
import { generatePassword } from 'src/utils/functions';
import { ViacepApi } from 'src/api/viacepApi';
import { Op } from 'sequelize';
import { Posts } from 'src/posts/posts.entity';
import { OngType } from 'src/ong-types/ong-types.entity';
import { uuid } from 'uuidv4';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class OngService {
  constructor(
    @Inject('ong') private ongRepo: typeof Ong,
    private rolesService: RolesService,
    private userService: UsersService,
    private viacepApi: ViacepApi,
  ) {}

  async getAll() {
    return await this.ongRepo.findAll();
  }

  async getById(id: number) {
    const ong = await this.ongRepo.findByPk(id, { include: [Posts, OngType] });
    if (!ong) throw new NotFoundException('ONG não encontrada');
    return ong;
  }

  async getByOngType(id: number) {
    return await this.ongRepo.findAll({
      where: { OngTypeId: id },
      include: [Posts, OngType],
    });
  }

  async createOng(dto: CreateOngDto) {
    const cepRequest = await this.viacepApi.getCep(dto.cep);
    if (cepRequest.error) {
      throw new BadRequestException(cepRequest.error.message);
    }
    const userCheck = await this.ongRepo.count({
      where: {
        [Op.or]: [{ Email: dto.cep }, { Cnpj: dto.cnpj }],
      },
    });
    if (userCheck)
      throw new UnprocessableEntityException(
        'E-mail ou CPF/CNPJ já existente na base de dados',
      );
    const { password, salt } = await generatePassword(dto.password);
    const roleId = await this.rolesService.getOngRoleId();
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
      OngName: dto.name,
      Cnpj: dto.cnpj,
      Email: dto.email,
      Cep: cepRequest.data.cep,
      OngTypeId: dto.ongType,
      UserId: userCreated.dataValues.User_Id,
    };

    const ong = await this.ongRepo.create(creation);

    return ong;
  }
}
