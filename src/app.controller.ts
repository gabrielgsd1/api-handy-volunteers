import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Users } from './users/users.entity';
import { Assistants } from './assistants/assistants.entity';

@Controller()
export class AppController {
  constructor(
    @Inject('users') private usersRepo: typeof Users,
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello() {
    return await this.usersRepo.findAll({ include: { model: Assistants } });
  }
}
