import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//Necesario para usar esta clase como guards en el controller (extiende de jwt)
export class JwtAuthGuard extends AuthGuard('jwt') {}