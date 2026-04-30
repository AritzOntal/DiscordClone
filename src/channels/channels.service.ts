import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChannelsService {

  constructor(private prisma: PrismaService) { }

  async create(createChannelDto: CreateChannelDto, userId: number) {

    const server = await this.prisma.server.findUnique({
      where: { id: createChannelDto.serverId }
    })

    if (!server) {
      throw new NotFoundException('El servidor no existe');
    }

    //COMPARA EL idUser de TOKEN con el owner de Server
    if (server.ownerId !== userId) {
      throw new ForbiddenException('No tienes permiso para crear canales en este servidor');
    }

    return await this.prisma.channel.create({
      data: createChannelDto,
    })
  }

  async findAll() {
    return await this.prisma.channel.findMany();
  }

  async findOne(id: number) {

    try {
      const channel = await this.prisma.channel.findUnique({
        where: { id: id }
      })

      if (!channel) {
        throw new NotFoundException(`El canal con ID ${id} no existe`);
      }

      return channel

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }

  async update(id: number, updateChannelDto: UpdateChannelDto, userId: number) {

  // 1. Buscamos el canal y traemos su server con un JOIN
  const channel = await this.prisma.channel.findUnique({
    where: { id },
    include: { server: true },
  });

  if (!channel) {
    throw new NotFoundException(`El canal con ID ${id} no existe`);
  }

  // Si el dueño del server no es el mismo que el Owner
  if (channel.server.ownerId !== userId) {
    throw new ForbiddenException('Sólo el dueño del servidor puede editar canales');
  }

  return await this.prisma.channel.update({
    where: { id },
    data: updateChannelDto,
  });
}

  async remove(id: number, userId: number) {

  const channel = await this.prisma.channel.findUnique({
    where: { id },
    include: { server: true },
  });

  if (!channel) {
    throw new NotFoundException(`El canal con ID ${id} no existe`);
  }

  if (channel.server.ownerId !== userId) {
    throw new ForbiddenException('Sólo el dueño del servidor puede borrar canales');
  }

  return await this.prisma.channel.delete({
    where: { id },
  });
}
}
