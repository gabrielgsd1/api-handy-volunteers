import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  Model,
  Sequelize,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';
import { Ong } from 'src/ong/ong.entity';
import { Roles } from 'src/roles/roles.entity';

@Table({ tableName: 'Users' })
export class Users extends Model {
  @Default(Sequelize.fn('gen_random_uuid'))
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
  @Column
  RoleId: string;

  @Default(Sequelize.fn('now'))
  @Column({ type: DataType.DATE })
  CreatedAt: Date;

  @Default(Sequelize.fn('now'))
  @Column({ type: DataType.DATE })
  LastUpdatedAt: Date;

  @HasOne(() => Assistants)
  Assistant: Assistants;

  @HasOne(() => Ong)
  Ong: Ong;

  @BelongsTo(() => Roles)
  Role: Roles;
}
