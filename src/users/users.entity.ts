import {
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  Sequelize,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';

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

  @Column
  RoleId: string;

  @Column({ type: DataType.DATE })
  CreatedAt: Date;

  @Column({ type: DataType.DATE })
  LastUpdatedAt: Date;

  @HasOne(() => Assistants)
  Assistant: Assistants;
}
