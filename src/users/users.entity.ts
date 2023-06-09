import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  Sequelize,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';
import { Ong } from 'src/ong/ong.entity';
import { Roles } from 'src/roles/roles.entity';
import { uuid } from 'uuidv4';

@Table({ tableName: 'Users', updatedAt: 'LastUpdatedAt' })
export class Users extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  User_Id: string;

  @Column
  Name: string;

  @Unique
  @Column
  Email: string;

  @Column
  AvatarLink: string;

  @Column
  Hash: string;

  @Column
  Salt: string;

  @ForeignKey(() => Roles)
  @Column({ type: DataType.INTEGER })
  RoleId: number;

  @CreatedAt
  @Column({ type: DataType.DATE })
  CreatedAt: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  LastUpdatedAt: Date;

  @HasOne(() => Assistants)
  Assistant: Assistants;

  @HasOne(() => Ong)
  Ong: Ong;

  @BelongsTo(() => Roles)
  Role: Roles;
}
