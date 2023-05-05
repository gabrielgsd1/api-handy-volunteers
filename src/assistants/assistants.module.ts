import { Module } from '@nestjs/common/decorators';
import { AssistantsService } from './assistants.service';
import { AssistantsController } from './assistants.controller';
import { Assistants } from './assistants.entity';
import { Users } from 'src/users/users.entity';
import { ViacepApi } from 'src/api/viacepApi';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [
    AssistantsService,
    ViacepApi,
    UsersService,
    { provide: 'assistants', useValue: Assistants },
    { provide: 'users', useValue: Users },
  ],
  controllers: [AssistantsController],
})
export class AssistantsModule {}
