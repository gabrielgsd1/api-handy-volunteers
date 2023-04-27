import { Inject, Injectable } from '@nestjs/common/decorators';
import { Posts } from './posts.entity';
import { CreatePostDto } from './posts.dtos';
import { Op } from 'sequelize';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Assistants } from 'src/assistants/assistants.entity';
import { JobTypes } from 'src/job-types/job-types.entity';
import { Ong } from 'src/ong/ong.entity';

@Injectable()
export class PostsService {
  constructor(@Inject('posts') private postsRepo: typeof Posts) {}

  private includeAllRelations = { include: [Assistants, JobTypes, Ong] };

  async getAllPosts() {
    return await this.postsRepo.findAll(this.includeAllRelations);
  }

  async getPostById(id: number) {
    return await this.postsRepo.findByPk(id, this.includeAllRelations);
  }

  async createPost(dto: CreatePostDto) {
    return await this.postsRepo.create(
      {
        Title: dto.title,
        Content: dto.content,
        JobTypeId: dto.jobTypeId,
        OngId: dto.ongId,
        CreatedAt: new Date().toISOString(),
      },
      this.includeAllRelations,
    );
  }

  async assignToAssistant(assistantId: number, postId: string) {
    const count = await this.postsRepo.count({
      where: {
        AssistantId: { [Op.eq]: null },
        PostId: postId,
      },
    });
    if (!count) {
      throw new BadRequestException('Tarefá já possui assistante');
    }
    await this.postsRepo.update(
      { AssistantId: assistantId, AssignedAt: new Date().toISOString() },
      {
        where: { PostId: postId },
      },
    );

    return await this.postsRepo.findByPk(postId, this.includeAllRelations);
  }

  async markAsComplete(id: string) {
    const post = await this.postsRepo.count({ where: { PostId: id } });
    if (!post) throw new NotFoundException('Post não encontrado');
    await this.postsRepo.update(
      { FinishedAt: new Date().toISOString() },
      {
        where: { PostId: id },
      },
    );

    return await this.postsRepo.findByPk(id, this.includeAllRelations);
  }

  async deletePost(postId: string) {
    const postToDelete = await this.postsRepo.findByPk(postId);
    if (!postToDelete) throw new NotFoundException('Post não encontrado');
    await this.postsRepo.destroy({
      where: { PostId: postId },
    });
    return postToDelete;
  }

  async getAvailableJobs() {
    return await this.postsRepo.findAll({
      where: {
        FinishedAt: { [Op.eq]: null },
        AssistantId: { [Op.eq]: null },
      },
      ...this.includeAllRelations,
    });
  }

  async getPostsByOng(id: number) {
    return await this.postsRepo.findAll({
      where: {
        OngId: id,
      },
      ...this.includeAllRelations,
    });
  }
}
