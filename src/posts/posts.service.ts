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
import { uuid } from 'uuidv4';

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
    const post = await this.postsRepo.findByPk(
      id,
      this.includeAllRelations as any,
    );
    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  async createPost(dto: CreatePostDto) {
    try {
      if (!dto.title || dto.title.trim().length === 0)
        throw new UnprocessableEntityException('Post sem título');

      if (!dto.content || dto.content.trim().length === 0)
        throw new UnprocessableEntityException('Post sem conteúdo');

      if (!dto.ongId) throw new UnprocessableEntityException('Sem ID de ONG');
      if (!dto.finishDate || !dto.startDate)
        throw new UnprocessableEntityException('Sem datas');
      return await this.postsRepo.create(
        {
          PostId: uuid(),
          Title: dto.title,
          Content: dto.content,
          FinishDate: dto.finishDate,
          StartDate: dto.startDate,
          OngId: dto.ongId,
          CreatedAt: new Date().toISOString(),
        },
        this.includeAllRelations as any,
      );
    } catch (e) {
      throw new UnprocessableEntityException(
        e?.message || 'Erro ao criar post',
      );
    }
  }

  async assignToAssistant(assistantId: number, postId: string) {
    const count = await this.postsRepo.findOne({
      where: {
        PostId: postId,
      },
    });
    if (!count) {
      throw new NotFoundException('Post inexistente');
    }
    if (count.AssistantId)
      throw new BadRequestException('Tarefa já possui assistente');
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
    const post = await this.postsRepo.count({
      where: { PostId: id, FinishedAt: { [Op.eq]: null } },
    });
    if (!post) throw new NotFoundException('Post não encontrado');
    await this.postsRepo.update(
      { FinishedAt: new Date().toISOString() },
      {
        where: { PostId: id },
      },
    );

    const notFinishedJobs = await this.postsRepo.findAll({
      where: {
        FinishedAt: { [Op.eq]: null },
        AssistantId: { [Op.ne]: null },
      },
    });

    return {
      notFinishedJobs,
      finishedJob: await this.postsRepo.findByPk(
        id,
        this.includeAllRelations as any,
      ),
    };
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

  async getCurrentPostsByOng(id: number) {
    return await this.postsRepo.findAll({
      include: [{ model: Ong, include: [OngType] }],
      where: {
        OngId: id,
        AssistantId: { [Op.ne]: null },
        FinishedAt: { [Op.eq]: null },
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
      include: [{ model: Ong, include: [OngType] }, { model: Assistants }],
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
