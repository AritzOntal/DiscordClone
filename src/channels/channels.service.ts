import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChannelsService {

  constructor(private prisma: PrismaService) { }

  async create(createChannelDto: CreateChannelDto) {
    try {
      return await this.prisma.channel.create({
        data: createChannelDto,
      })

    } catch (error) {
      throw error
    }
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

  async update(id: number, updateChannelDto: UpdateChannelDto) {

    try {
      return await this.prisma.channel.update({
        where: { id: id },
        data: updateChannelDto,
      })

    } catch (error) {

      if (error.code === 'P2025') {
        throw new NotFoundException(`El canal con ID ${id} no existe`);
      }
      throw error
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.channel.delete({
        where: { id: id }
      })
    } catch {

    }
  }
}
