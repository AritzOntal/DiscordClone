import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

//Al hacer peticion LOGIN esta estrategy se registra en el Passport (jwt)

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET', // La misma que usaste en JwtModule.register
        });
    }

    //Cuando passPort reconoce el token correcto, decodifica y se lo pasa aqui
    async validate(payload: any) {
        // Si el token es válido devolverá estos campos
        return { userId: payload.sub, email: payload.email };
        //Con esto validaremos si el usuario es correcto en los Services
    }
}