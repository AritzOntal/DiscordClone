import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ajusta la ruta según tu carpeta

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto, @Request() req ) {
    const userId = req.user.userId
    return await this.channelsService.create(createChannelDto, userId);
  }

  @Get()
  async findAll() {
    return await this.channelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.channelsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return await this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(':id')
  @HttpCode(204) //Forzar a que devuelva 204 si se ha eliminado correctamente
  async remove(@Param('id') id: string) {
    return await this.channelsService.remove(+id);
  }
}
