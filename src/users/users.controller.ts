import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get('verify-token')
  async verifyToken(@Req() request: Request) {
    return await this.usersService.verifyToken(
      request.headers['authorization'],
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usersService.getById(id);
  }

  @Post('login')
  async login(@Body() credentials) {
    return await this.usersService.login(credentials);
  }
}
