import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Posts } from 'src/posts/posts.entity';
import { Users } from 'src/users/users.entity';

@Table({ tableName: 'Assistants' })
export class Assistants extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  AssistantId: string;

  @Column
  Name: string;

  @Column
  Cnpj_Cpf: string;

  @Column
  Phone: string;

  @Column
  Cep: string;

  @Column
  Email: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  UserId: string;

  @BelongsTo(() => Users)
  User: Users;

  @HasMany(() => Posts)
  posts: Posts[];
}
