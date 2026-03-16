import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    return await this.channelsService.create(createChannelDto);
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
