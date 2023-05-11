import { Module } from '@nestjs/common/decorators';
import { Sequelize } from 'sequelize-typescript';
import { Assistants } from 'src/assistants/assistants.entity';
import { OngType } from 'src/ong-types/ong-types.entity';
import { Ong } from 'src/ong/ong.entity';
import { Posts } from 'src/posts/posts.entity';
import { Roles } from 'src/roles/roles.entity';
import { Users } from 'src/users/users.entity';

@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          dialect: 'postgres',
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
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
