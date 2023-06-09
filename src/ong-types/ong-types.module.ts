import { Module } from '@nestjs/common';
import { OngTypesController } from './ong-types.controller';
import { OngTypesService } from './ong-types.service';
import { OngType } from './ong-types.entity';

@Module({
  controllers: [OngTypesController],
  providers: [OngTypesService, { provide: 'ongtypes', useValue: OngType }],
  exports: [OngTypesService, { provide: 'ongtypes', useValue: OngType }],
})
export class OngTypesModule {}
