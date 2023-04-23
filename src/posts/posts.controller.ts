import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common/decorators';
import { PostsService } from './posts.service';
import { AssignToAssistantDto, CreatePostDto } from './posts.dtos';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Post()
  async createPost(@Body() body: CreatePostDto) {
    return await this.postsService.createPost(body);
  }

  @Post('assign-to-assistant')
  async assignToAssistant(@Body() body: AssignToAssistantDto) {
    return await this.postsService.assignToAssistant(
      body.assistantId,
      body.postId,
    );
  }

  @Get('mark-as-complete/:id')
  async markAsFinished(@Param('id') id: string) {
    return await this.postsService.markAsComplete(id);
  }

  @Delete(':id')
  async deletePostById(@Param('id') postId: string) {
    return await this.postsService.deletePost(postId);
  }

  @Get('available-jobs')
  async getAvailableJobs() {
    return await this.postsService.getAvailableJobs();
  }

  @Get('ong/:id')
  async getPostsByOng(@Param('id') id: number) {
    return await this.postsService.getPostsByOng(id);
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return await this.postsService.getPostById(id);
  }
}
