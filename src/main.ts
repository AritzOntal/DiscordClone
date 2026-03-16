import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Esto capta todas las peticiones y las revisa con los Dtos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // Elimina campos del JSON que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si mandan campos extraños
  }));

  const config = new DocumentBuilder()
    .setTitle('Discord Clone API')
    .setDescription('Documentación de la API para Usuarios, Servidores y Canales')
    .setVersion('1.0')
    .addBearerAuth() // para el Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();  
