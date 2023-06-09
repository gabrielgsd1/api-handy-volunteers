import { Inject, Module } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AssistantsModule } from './assistants/assistants.module';
import { UsersModule } from './users/users.module';
import { OngModule } from './ong/ong.module';
import { OngTypesModule } from './ong-types/ong-types.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OnApplicationBootstrap } from '@nestjs/common';
import { Roles } from './roles/roles.entity';
import { RolesModule } from './roles/roles.module';
import { Op } from 'sequelize';
import { OngType } from './ong-types/ong-types.entity';
import { Model } from 'sequelize-typescript';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AssistantsModule,
    UsersModule,
    DatabaseModule,
    OngModule,
    AuthModule,
    OngTypesModule,
    RolesModule,
    PostsModule,
  ],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @Inject('roles') private rolesRepo: typeof Roles,
    @Inject('ongtypes') private ongTypeRepo: typeof OngType,
  ) {}

  async onApplicationBootstrap() {
    await this.ongTypeRepo.findOrCreate(whereFactory('Ambiental'));
    await this.ongTypeRepo.findOrCreate(whereFactory('Assistencia Social'));
    await this.ongTypeRepo.findOrCreate(whereFactory('Educação'));
    await this.ongTypeRepo.findOrCreate(whereFactory('Animais'));
    await this.ongTypeRepo.findOrCreate(whereFactory('Esporte'));
    await this.rolesRepo.findOrCreate(whereFactory('Assistant'));
    await this.rolesRepo.findOrCreate(whereFactory('Ong'));
  }
}

function whereFactory(val: string) {
  return { where: { Name: val } };
}
