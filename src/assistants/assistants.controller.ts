import { Body, Controller, Post } from '@nestjs/common/decorators';
import { CreateAssistantDto } from './assistants.dtos';
import { AssistantsService } from './assistants.service';

@Controller('assistants')
export class AssistantsController {
  constructor(private assistantsService: AssistantsService) {}
  @Post()
  async createAssistant(@Body() body: CreateAssistantDto) {
    return await this.assistantsService.createAssistant(body);
  }
}
