import {
  AutoIncrement,
  Column,
  Sequelize,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';
import { JobTypes } from 'src/job-types/job-types.entity';
import { Ong } from 'src/ong/ong.entity';

@Table({ tableName: 'Posts' })
export class Posts extends Model {
  @PrimaryKey
  @Default(Sequelize.fn('gen_random_uuid'))
  @Column({ type: DataType.UUID })
  PostId: string;

  @Column
  Title: string;

  @Column
  Content: string;

  @ForeignKey(() => Ong)
  @Column
  OngId: number;

  @ForeignKey(() => Assistants)
  @Column
  AssistantId: number;

  @ForeignKey(() => JobTypes)
  @Column
  JobTypeId: number;

  @Column({ type: DataType.DATE })
  CreatedAt: Date;

  @Column({ type: DataType.DATE })
  FinishedAt: Date;

  @Column({ type: DataType.DATE })
  AssignedAt: Date;

  @BelongsTo(() => Assistants, 'AssistantId')
  Assistant: Assistants;

  @BelongsTo(() => JobTypes)
  JobType: JobTypes;

  @BelongsTo(() => Ong)
  Ong: Ong;
}
