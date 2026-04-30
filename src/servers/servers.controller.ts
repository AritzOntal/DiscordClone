import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('servers')
export class ServersController {
  constructor(private readonly serversService: ServersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createServerDto: CreateServerDto, @Request() req) {
    const userId = req.user.userId
    return await this.serversService.create(createServerDto, userId);
  }

  @Get()
  async findAll() {
    return await this.serversService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.serversService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto, @Request() req) {
    const userId = req.user.userId
    return await this.serversService.update(+id, updateServerDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return await this.serversService.remove(+id, userId);
  }
}
