import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, { provide: 'roles', useValue: Roles }],
  exports: [RolesService, { provide: 'roles', useValue: Roles }],
})
export class RolesModule {}
