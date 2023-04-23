import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [{ provide: 'users', useValue: Users }, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
