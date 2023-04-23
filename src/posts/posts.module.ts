import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Posts } from './posts.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService, { provide: 'posts', useValue: Posts }],
})
export class PostsModule {}
