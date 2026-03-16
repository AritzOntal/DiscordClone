import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServersService {

  constructor(private prisma: PrismaService) { }

  async create(createServerDto: CreateServerDto) {

    try {

      return await this.prisma.server.create({
        data: createServerDto,
      })

    } catch (error) {

      throw error
      
    }
  }

  async findAll() {
    try {

      return await this.prisma.server.findMany()

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

      //Aquí le decimos que si el error a sido 404 deje pasar ese al cliente
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  async update(id: number, updateServerDto: UpdateServerDto) {
    try {

      return await this.prisma.server.update({
        where: {id: id},
        data: updateServerDto,
      })

    } catch (error) {

      if (error.code === 'P2025') {
      throw new NotFoundException(`El servidor con ID ${id} no existe`);
    }
    
    if (error.code === 'P2003') {
      throw new BadRequestException(`El nuevo dueño (ID ${updateServerDto.ownerId}) no existe`);
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
