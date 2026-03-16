import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'src/prisma.service';

//Es inyectable en el constructor del usersController
@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        try {

            return await this.prisma.user.findMany()

        } catch (error) {
            throw new InternalServerErrorException('Error al conectar con la base de datos');
        }
    }

    async create(createUserDto: CreateUserDto) {
        try {

            return await this.prisma.user.create({
                data: createUserDto,
            });

        } catch (error) {

            if (error.code === 'P2002') {
                throw new ConflictException('El email ya está registrado');
            }
        }
    }

    async findOne(id: number) {

        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id }
            })

            // findUnique devuelve null si no encuentra nada, NO lanza error P2025
            if (!user) {
                throw new NotFoundException(`El usuario con ID ${id} no existe`);
            }

            return user

        } catch (error) {

            //Aquí le decimos que si el error a sido 404 deje pasar ese al cliente
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException('Error al buscar el usuario');
        }
    }


    async modify(id: number, updateUserDto: UpdateUserDto) {
        try {

            return await this.prisma.user.update({
                where: { id: id },
                data: updateUserDto,    // VALORES NUEVOS
            });

        } catch (error) {

            if (error.code === 'P2025') {
                throw new NotFoundException(`El usuario con ID ${id} no existe`);
            }
            throw error
        }
    }

    async remove(id: number) {

        try {
            return await this.prisma.user.delete({
                where: { id },
            });

        } catch (error) {

            if (error.code === 'P2025') {
                throw new NotFoundException(`El usuario con ID ${id} no existe`);
            }

            if (error.code === 'P2003') {
                throw new BadRequestException('No se puede borrar: tiene registros asociados.');
            }
            throw new InternalServerErrorException('Error inesperado al intentar borrar el usuario');
        }
    }
}
