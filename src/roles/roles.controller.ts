import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @Get()
  async getAllOngTypes() {
    return await this.roleService.getAllTypes();
  }
}
