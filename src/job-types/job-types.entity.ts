import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Posts } from 'src/posts/posts.entity';

@Table({ tableName: 'JobTypes' })
export class JobTypes extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  JobTypeId: string;

  @Column
  Name: string;

  @HasMany(() => Posts)
  posts: Posts[];
}
