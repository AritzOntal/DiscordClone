import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class MessagesService {

  constructor(private prisma: PrismaService) { }

  async create(createMessageDto: CreateMessageDto, userId: number) {

    const channel = await this.prisma.channel.findUnique({
      where: { id: createMessageDto.channelId },
      include: {
        server: {
          include: {
            members: {
              where: { id: userId }
            }
          }
        }
      }
    });

    if (!channel) {
      throw new NotFoundException('El canal no existe');
    }

    //Si el array de members está vacío...
    if (channel.server.members.length === 0) {
      throw new ForbiddenException('No tienes permiso para escribir en este servidor');
    }

    return await this.prisma.message.create({
      data: {
        content: createMessageDto.content, // Texto del mensaje
        author: {
          connect: { id: userId } // Conecta con el usuario del token
        },
        channel: {
          connect: { id: createMessageDto.channelId } // Conecta con el canal
        }
      }
    });
  }

  async findAll(userId: number) {
    //ENSEÑAR SOLO MENSAJES DE SERVIDORES DONDE ESTÉ ESTE USUARIO
    //CON SOME PODEMOS TRAER SOLO ESOS DESPUES DE WHERE
    const messages = await this.prisma.message.findMany({
      where: {
        channel: {
          server: {
            members: {
              some: { id: userId } // "Trae mensajes donde algún miembro del servidor sea este ID"
            }
          }
        }
      }
    })

    return messages
  }
}
