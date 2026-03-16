  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { UsersModule } from './users/users.module';
import { ServersModule } from './servers/servers.module';
import { ChannelsModule } from './channels/channels.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

  @Module({
    imports: [UsersModule, ServersModule, ChannelsModule, AuthModule],
    controllers: [AppController],
    providers: [AppService],
  })

  export class AppModule {
    
  }
