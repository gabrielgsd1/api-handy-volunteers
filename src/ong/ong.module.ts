import { Module, Scope } from '@nestjs/common';
import { OngController } from './ong.controller';
import { OngService } from './ong.service';
import { Ong } from './ong.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.entity';
import { ViacepApi } from 'src/api/viacepApi';

@Module({
  controllers: [OngController],
  providers: [
    OngService,
    { provide: 'ong', useValue: Ong },
    { provide: 'users', useValue: Users },
    UsersService,
    ViacepApi,
  ],
})
export class OngModule {}
