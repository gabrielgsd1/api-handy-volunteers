import { Module } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AssistantsModule } from './assistants/assistants.module';
import { UsersModule } from './users/users.module';
import { OngModule } from './ong/ong.module';
import { OngTypesModule } from './ong-types/ong-types.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AssistantsModule,
    UsersModule,
    DatabaseModule,
    OngModule,
    AuthModule,
    OngTypesModule,
    PostsModule,
  ],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule {}
