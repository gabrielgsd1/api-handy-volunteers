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
import { OngType } from 'src/ong-types/ong-types.entity';
import { Posts } from 'src/posts/posts.entity';
import { Users } from 'src/users/users.entity';

@Table({ tableName: 'Ong' })
export class Ong extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  OngId: string;

  @Column
  OngName: string;

  @Column
  Cnpj: string;

  @Column
  Cep: string;

  @Column
  Email: string;

  @ForeignKey(() => OngType)
  @Column
  OngTypeId: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  UserId: string;

  @BelongsTo(() => OngType)
  OngType: OngType;

  @BelongsTo(() => Users, 'UserId')
  User: Users;

  @HasMany(() => Posts)
  Posts: Posts[];
}
