import { Injectable } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user) {
    return await this.jwtService.signAsync(user);
  }

  async checkToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token.split(' ')[1].trim());
    } catch (e) {
      return null;
    }
  }
}
