import { Inject, Injectable } from '@nestjs/common';
import { OngType } from './ong-types.entity';

@Injectable()
export class OngTypesService {
  constructor(@Inject('ongtypes') private ongTRepo: typeof OngType) {}

  async getAllTypes() {
    return await this.ongTRepo.findAll();
  }

  async getTypeById(id: number) {
    return await this.ongTRepo.findByPk(id);
  }
}
