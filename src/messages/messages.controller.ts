import { Controller, Post, Get, Body, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    const userId = req.user.userId
    return await this.messagesService.create(createMessageDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {

    const userId = req.user.userId
    return await this.messagesService.findAll(+userId)
  }

}
