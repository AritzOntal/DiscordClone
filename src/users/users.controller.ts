import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.user.dto';


@Controller('users')
export class UsersController {
    //inyeccion por constructor
    constructor(private readonly usersService: UsersService) { }

    @Get()
    get(): User[] {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getById(
        @Param('id') id: string): User {
        return this.usersService.getUser(+id) // El "+" lo convierte a numero para el service
    }

    /* @Post()
    create(
        @Body('name') name: string,
        @Body('email') email: string
    ): User {
        return this.usersService.create(name, email)
    } */


    //CON DTOS
    @Post()
    create(@Body() createUserDto: CreateUserDto): User { 
        // Ahora el @Body está vacío
        // Pero lo atrapa y lo convierte en un objeto createUserDto
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('email') email: string
    ): User {
        return this.usersService.modify(+id, name, email)
    }


    @Delete('id')
    @HttpCode(204) //Forzar a que devuelva 204 si se ha eliminado correctamente
    deleteUser(@Param('id') id: string): void {
        this.usersService.remove(+id)
    }
}
