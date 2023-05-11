import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/users/users.entity';

@Table({ tableName: 'Roles' })
export class Roles extends Model<Roles> {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  RoleId: number;

  @Column
  Name: string;

  @HasMany(() => Users)
  users: Users[];
}
