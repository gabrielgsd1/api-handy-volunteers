import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Users } from './users.entity';
import { checkPassword } from 'src/utils/functions';
import { CreateUser } from './users.dto';
import { Assistants } from 'src/assistants/assistants.entity';
import { Ong } from 'src/ong/ong.entity';
import { AuthService } from 'src/auth/auth.service';
import { OngType } from 'src/ong-types/ong-types.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('users') private usersRepo: typeof Users,
    private authService: AuthService,
  ) {}

  async getAll() {
    return await this.usersRepo.findAll();
  }

  async getById(id: string) {
    return await this.usersRepo.findByPk(id);
  }

  async createUser(dto) {
    return await this.usersRepo.create(dto);
  }

  async verifyToken(token: string) {
    const check = await this.authService.checkToken(token);
    if (!check) throw new ForbiddenException('Token inválido');
    return {
      user: check,
    };
  }

  async login({ email, password }) {
    const user = await this.usersRepo.findOne({
      where: { Email: email },
      include: [{ model: Ong, include: [OngType] }, Assistants],
    });
    if (!user) throw new NotFoundException(`Usuário ${email} não encontrado`);
    const passwordHashing = await checkPassword(password, user.Salt);
    if (user.Hash !== passwordHashing)
      throw new UnprocessableEntityException('Credenciais incorretas');
    const token = await this.authService.generateToken(user.dataValues);
    return {
      token,
      user,
    };
  }
}
