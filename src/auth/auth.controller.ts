import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('login')
export class AuthController {
    constructor(private readonly authservice: AuthService) { }

    @Post()
    async login(@Body('email')email: string, @Body('password') pass: string) {
        return this.authservice.login(email, pass)
    }
}
