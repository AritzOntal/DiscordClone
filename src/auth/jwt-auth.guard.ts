import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Este 'jwt' es el nombre por defecto de la estrategia de Passport que definimos
export class JwtAuthGuard extends AuthGuard('jwt') {}