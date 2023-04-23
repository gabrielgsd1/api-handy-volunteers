import { Module } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AssistantsModule } from './assistants/assistants.module';
import { UsersModule } from './users/users.module';
import { OngModule } from './ong/ong.module';
import { JobTypesModule } from './job-types/job-types.module';
import { OngTypesModule } from './ong-types/ong-types.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AssistantsModule,
    UsersModule,
    DatabaseModule,
    OngModule,
    JobTypesModule,
    OngTypesModule,
    PostsModule,
  ],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule {}
