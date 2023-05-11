import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('ongtype')
export class OngTypesController {
  constructor(private roleService: RolesService) {}
  @Get()
  async getAllOngTypes() {
    return await this.roleService.getAllTypes();
  }
}
