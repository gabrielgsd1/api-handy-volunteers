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

  @Column({ type: DataType.DATE })
  CreatedAt: string;

  @Column({ type: DataType.DATE })
  FinishedAt: string;

  @Column({ type: DataType.DATE })
  AssignedAt: string;

  @Column({ type: DataType.DATE })
  StartDate: string;

  @Column({ type: DataType.DATE })
  FinishDate: string;

  @BelongsTo(() => Assistants, 'AssistantId')
  Assistant: Assistants;

  @BelongsTo(() => Ong)
  Ong: Ong;
}
