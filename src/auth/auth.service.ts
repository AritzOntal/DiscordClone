import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, pass: string) {

        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(pass, user.password)

        if (!isMatch) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }
        //Si es correcta generamos el TOKEN
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
