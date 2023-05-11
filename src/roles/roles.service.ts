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
}
