import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET', 
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  // AÑADE JwtStrategy AQUÍ ABAJO 👇
  providers: [AuthService, JwtStrategy], 
})
export class AuthModule {}
