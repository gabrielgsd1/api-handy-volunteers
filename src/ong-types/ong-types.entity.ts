import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Ong } from 'src/ong/ong.entity';

@Table({ tableName: 'OngType' })
export class OngType extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  OngTypeId: string;

  @Column
  Name: string;

  @HasMany(() => Ong)
  Ongs: Ong[];
}
