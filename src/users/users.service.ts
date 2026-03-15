import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'src/prisma.service';
import { error } from 'console';

//Es inyectable en el constructor del usersController
@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        try {

            return await this.prisma.user.findMany;

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

            return await this.prisma.user.findUnique

        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException('el usuario no existe')
            }
        }
        throw error
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
            // Lanzamos el error original para que NestJS devuelva un 500
            throw error;
        }
    }
}
