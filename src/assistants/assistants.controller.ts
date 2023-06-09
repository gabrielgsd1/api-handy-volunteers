import { Body, Controller, Get, Param, Post } from '@nestjs/common/decorators';
import { CreateAssistantDto } from './assistants.dtos';
import { AssistantsService } from './assistants.service';

@Controller('assistants')
export class AssistantsController {
  constructor(private assistantsService: AssistantsService) {}
  @Post()
  async createAssistant(@Body() body: CreateAssistantDto) {
    return await this.assistantsService.createAssistant(body);
  }

  @Get()
  async getAllAssistants() {
    return await this.assistantsService.getAssistants();
  }

  @Get(':id')
  async getAssistantById(@Param('id') id: number) {
    return await this.assistantsService.getAssistantById(id);
  }
}
