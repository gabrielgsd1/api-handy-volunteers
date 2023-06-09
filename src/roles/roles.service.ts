import { Inject, Injectable } from '@nestjs/common';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@Inject('roles') private roleRepo: typeof Roles) {}

  async getAllTypes() {
    return await this.roleRepo.findAll();
  }

  async getTypeById(id: number) {
    return await this.roleRepo.findByPk(id);
  }

  protected async getRoleByName(name: string) {
    return await this.roleRepo.findOne({ where: { Name: name } });
  }

  async getOngRoleId() {
    const data = await this.getRoleByName('Ong');
    return data.RoleId;
  }

  async getAssistantRoleId() {
    const data = await this.getRoleByName('Assistant');
    return data.RoleId;
  }
}
