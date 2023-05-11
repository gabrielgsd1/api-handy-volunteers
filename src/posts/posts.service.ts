import { Inject, Injectable } from '@nestjs/common/decorators';
import { Posts } from './posts.entity';
import { CreatePostDto } from './posts.dtos';
import { Op } from 'sequelize';
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Assistants } from 'src/assistants/assistants.entity';
import { Ong } from 'src/ong/ong.entity';
import { OngType } from 'src/ong-types/ong-types.entity';

export interface SortingBody {
  sorting: string;
  ascOrDesc: string;
}

@Injectable()
export class PostsService {
  constructor(@Inject('posts') private postsRepo: typeof Posts) {}

  private includeAllRelations = {
    include: [{ model: Assistants }, { model: Ong, include: OngType }],
  };

  async getAllPosts() {
    return await this.postsRepo.findAll(this.includeAllRelations as any);
  }

  async getPostById(id: number) {
    return await this.postsRepo.findByPk(id, this.includeAllRelations as any);
  }

  async createPost(dto: CreatePostDto) {
    try {
      return await this.postsRepo.create(
        {
          Title: dto.title,
          Content: dto.content,
          FinishDate: dto.finishDate,
          StartDate: dto.startDate,
          JobTypeId: dto.jobTypeId,
          OngId: dto.ongId,
          CreatedAt: new Date().toISOString(),
        },
        this.includeAllRelations as any,
      );
    } catch (e) {
      throw new UnprocessableEntityException('Erro ao criar post');
    }
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

    return await this.postsRepo.findByPk(
      postId,
      this.includeAllRelations as any,
    );
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

    return await this.postsRepo.findByPk(id, this.includeAllRelations as any);
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
      include: [{ model: Ong, include: [OngType] }],
      where: {
        FinishedAt: { [Op.eq]: null },
        AssistantId: { [Op.eq]: null },
      },
    });
  }

  async getPostsByOng(id: number) {
    return await this.postsRepo.findAll({
      include: [{ model: Ong, include: [OngType] }],
      where: {
        OngId: id,
      },
    });
  }

  async getPostsByOngType(id: number, sorting: SortingBody) {
    return await this.postsRepo.findAll({
      include: [{ model: Ong, where: { OngTypeId: id }, include: [OngType] }],
      order: [
        [
          sorting.sorting ? sorting.sorting : 'CreatedAt',
          sorting.ascOrDesc ? sorting.ascOrDesc : 'desc',
        ],
      ],
    });
  }

  async getAvailablePostsByOngType(id: number, sorting: SortingBody) {
    console.log(sorting);
    return await this.postsRepo.findAll({
      include: [{ model: Ong, where: { OngTypeId: id }, include: [OngType] }],
      order: [
        [
          sorting.sorting ? sorting.sorting : 'CreatedAt',
          sorting.ascOrDesc ? sorting.ascOrDesc : 'desc',
        ],
      ],
      where: {
        AssistantId: null,
      },
    });
  }

  async getAssistantCurrentJobs(id: number, sorting: SortingBody) {
    console.log(sorting);
    return await this.postsRepo.findAll({
      include: [{ model: Ong, include: [OngType] }],
      order: [
        [
          sorting.sorting ? sorting.sorting : 'CreatedAt',
          sorting.ascOrDesc ? sorting.ascOrDesc : 'desc',
        ],
      ],
      where: {
        AssistantId: id,
        FinishedAt: { [Op.eq]: null },
      },
    });
  }

  async getAllAssistantJobs(id: number, sorting: SortingBody) {
    console.log(sorting);
    return await this.postsRepo.findAll({
      include: [{ model: Ong, include: [OngType] }],
      order: [
        [
          sorting.sorting ? sorting.sorting : 'CreatedAt',
          sorting.ascOrDesc ? sorting.ascOrDesc : 'desc',
        ],
      ],
      where: {
        AssistantId: id,
      },
    });
  }

  async getAssistantFinishedJobs(id: number, sorting?: SortingBody) {
    console.log(sorting);
    return await this.postsRepo.findAll({
      include: [{ model: Ong, include: [OngType] }],
      order: [
        [
          sorting.sorting ? sorting.sorting : 'CreatedAt',
          sorting.ascOrDesc ? sorting.ascOrDesc : 'desc',
        ],
      ],
      where: {
        AssistantId: id,
        FinishedAt: { [Op.ne]: null },
      },
    });
  }
}
