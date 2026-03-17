import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServersService {

  constructor(private prisma: PrismaService) { }

  async create(createServerDto: CreateServerDto, userId: number) {

    try {

      return await this.prisma.server.create({
        data: {
          name: createServerDto.name,
          description: createServerDto.description,
          // Conectamos al dueño
          owner: {
            connect: { id: userId }
          },
          // Transformamos [1, 2, 3] en [{id: 1}, {id: 2}, {id: 3}]
          members: {
            connect: createServerDto.members?.map(memberId => ({ id: Number(memberId) }))
          }
        }
      });

    } catch (error) {

      throw error

    }
  }

  async findAll() {
    try {

      return await this.prisma.server.findMany({
        include: {
          members: true
        }
      })

    } catch {

      throw new InternalServerErrorException('Error al conectar con la base de datos');
    }

  }

  async findOne(id: number) {

    try {

      const server = await this.prisma.server.findUnique({
        where: { id: id }
      })

      if (!server) {
        throw new NotFoundException(`El usuario con ID ${id} no existe`);
      }

      return await server

    } catch (error) {

      //Aquí le decimos que si el error a sido 404 deje pasarlo
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  async update(id: number, updateServerDto: UpdateServerDto, userId: number) {
    try {
      //Si hay algun servidor donde el id sea el numer del userId...
      const server = await this.prisma.server.findFirst({
        where: { id: id}
      })

      //Descartamos si no existe
      if (!server) {
        throw new NotFoundException('El servidor no existe');
      }

      //Comprobamos 
      if (server.ownerId !== userId) {
        throw new ForbiddenException('No tienes permiso para editar este servidor');
      }

      return await this.prisma.server.update({

        where: { id: id },
        data: {
          name: updateServerDto.name,
          description: updateServerDto.description,
          // Transformamos [1, 2, 3] en [{id: 1}, {id: 2}, {id: 3}]
          members: {
            connect: updateServerDto.members?.map(memberId => ({ id: Number(memberId) })),
          }
        }
      })

    } catch (error) {

      if (error.code === 'P2025') {
        throw new NotFoundException(`Un usuario al que quieres conectar no existe`);
      }

      throw error
    }
  }


  async remove(id: number) {
    try {

      return await this.prisma.server.delete({
        where: { id },
      });

    } catch (error) {

      throw error

    }
  }
}
