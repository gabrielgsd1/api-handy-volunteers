import { Module } from '@nestjs/common/decorators';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';
import { OngType } from 'src/ong-types/ong-types.entity';
import { Ong } from 'src/ong/ong.entity';
import { Posts } from 'src/posts/posts.entity';
import { Roles } from 'src/roles/roles.entity';
import { Users } from 'src/users/users.entity';

function handleParams() {
  if (!process.env.PRODUCTION) {
    return {
      storage: process.env.DB_STORAGE || './database.db',
      dialect: (process.env.DB_LOCAL_DIALECT as Dialect) || 'sqlite',
    };
  }
  return {
    dialect: process.env.DB_PROD_DIALECT as Dialect,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
}

@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          ...handleParams(),
          define: {
            timestamps: false,
          },
          models: [Users, Assistants, Ong, OngType, Posts, Roles],
        });
        await sequelize.sync();
        return sequelize;
      },
    },
  ],
})
export class DatabaseModule {}
