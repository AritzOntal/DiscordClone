import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';


//Es inyectable en el constructor del usersController
@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        try {
            //Sacamos el pasword del DTO
            const { password, ...restOfData } = createUserDto;
            //instanciamos el Salt y lo encriptamos
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            return await this.prisma.user.create({
                data: {
                    ...restOfData,
                    password: hashedPassword
                }
            });

        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new ConflictException('El email ya está registrado');
            }
            throw error;
        }
    }

    async findAll() {
        try {

            return await this.prisma.user.findMany()

        } catch (error) {
            throw new InternalServerErrorException('Error al conectar con la base de datos');
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

            if (error instanceof NotFoundException) {
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
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new NotFoundException(`El usuario con ID ${id} no existe`);
        }

        if (error.code === 'P2003') {
            throw new BadRequestException('No se puede borrar: tiene registros asociados');
        }

        throw new InternalServerErrorException('Error no controlado');
    }
}

    async findOneByEmail(email: string) {
        // Directo y sin vueltas: si existe lo da, si no, da null.
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }
}
