import { Module } from '@nestjs/common';
import { OngTypesController } from './roles.controller';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Module({
  controllers: [OngTypesController],
  providers: [RolesService, { provide: 'roles', useValue: Roles }],
})
export class OngTypesModule {}
