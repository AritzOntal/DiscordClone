import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', // Luego ira en el .env
      signOptions: { expiresIn: '24h' },     // El token dura un día
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}
