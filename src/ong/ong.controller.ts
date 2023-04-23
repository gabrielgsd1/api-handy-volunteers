import { Body, Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { OngService } from './ong.service';
import { CreateOngDto } from './ong.dtos';

@Controller('ong')
export class OngController {
  constructor(private ongService: OngService) {}

  @Get()
  async getAll() {
    return await this.ongService.getAll();
  }

  @Get('ong-type/:id')
  async getByOngType(@Param('id') id: number) {
    return await this.ongService.getByOngType(id);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.ongService.getById(id);
  }

  @Post()
  async createOng(@Body() createOng: CreateOngDto) {
    return await this.ongService.createOng(createOng);
  }
}
