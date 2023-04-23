import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { checkPassword } from 'src/utils/functions';

@Injectable()
export class UsersService {
  constructor(@Inject('users') private usersRepo: typeof Users) {}

  async getAll() {
    return await this.usersRepo.findAll();
  }

  async getById(id: string) {
    return await this.usersRepo.findByPk(id);
  }

  async createUser(dto) {
    console.log(dto);
    return await this.usersRepo.create(dto);
  }

  async login({ email, password }) {
    const user = await this.usersRepo.findOne({
      where: { Email: email },
    });
    if (!user) throw new NotFoundException(`User ${email} not found`);
    const passwordHashing = await checkPassword(password, user.Salt);
    return user.Hash === passwordHashing;
  }
}
