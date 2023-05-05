import { Module } from '@nestjs/common/decorators';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1d',
      },
      secret: 'H@ndyVolunteers',
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
