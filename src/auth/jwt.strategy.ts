import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET', // La misma que usaste en JwtModule.register
        });
    }

    async validate(payload: any) {
        // Esto es lo que se inyectará en req.user
        return { userId: payload.sub, email: payload.email };
    }
}