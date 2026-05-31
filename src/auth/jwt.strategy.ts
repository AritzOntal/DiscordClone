import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


//Para las peticiones protegidas usamos la librería PassportStrategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET', // Esta tendra que ser la firma de AuthModule
        });
    }

    //Cuando passPort reconoce el token correcto, decodifica y se lo pasa aqui
    //Ocurre en cada peticion protegida
    async validate(payload: any) {
        // Si el token es válido devolverá estos campos
        return { userId: payload.sub, email: payload.email };
        //Con esto validaremos si el usuario es correcto en los Services
    }
}