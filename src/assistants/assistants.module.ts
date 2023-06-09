import { Module } from '@nestjs/common/decorators';
import { AssistantsService } from './assistants.service';
import { AssistantsController } from './assistants.controller';
import { Assistants } from './assistants.entity';
import { Users } from 'src/users/users.entity';
import { ViacepApi } from 'src/api/viacepApi';
import { UsersService } from 'src/users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { Roles } from 'src/roles/roles.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [AuthModule, RolesModule],
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
