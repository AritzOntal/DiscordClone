import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createChannelDto: CreateChannelDto, @Request() req) {
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return await this.channelsService.update(+id, updateChannelDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return await this.channelsService.remove(+id, userId);
  }
}
