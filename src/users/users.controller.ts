import { Body, Controller, Delete, Get, Param, Post, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
    //inyeccion por constructor
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async get() {
        return await this.usersService.findAll()
    }

    @Get(':id')
    async getById(
        @Param('id') id: string) {
        return await this.usersService.findOne(+id) // El "+" lo convierte a numero para el service
    }

    //CON DTOs
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.modify(+id, updateUserDto)
    }


    @Delete(':id')
    @HttpCode(204) //Forzar a que devuelva 204 si se ha eliminado correctamente
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.remove(+id)
    }
}
