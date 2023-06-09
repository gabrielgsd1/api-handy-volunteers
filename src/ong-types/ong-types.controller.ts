import { Controller, Get, Param } from '@nestjs/common';
import { OngTypesService } from './ong-types.service';

@Controller('ongtype')
export class OngTypesController {
  constructor(private ongTService: OngTypesService) {}
  @Get()
  async getAllOngTypes() {
    return await this.ongTService.getAllTypes();
  }

  @Get(':id')
  async getOngType(@Param('id') id: number) {
    return await this.ongTService.getTypeById(id);
  }
}
