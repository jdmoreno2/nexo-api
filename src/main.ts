import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  // Configuración Swagger
  if (configService.get('swagger.enabled')) {
    const config = new DocumentBuilder()
      .setTitle(String(configService.get('swagger.title')))
      .setDescription(String(configService.get('swagger.description')))
      .setVersion(String(configService.get('swagger.version')))
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      String(configService.get('swagger.path')),
      app,
      document,
      configService.get('swagger.customOptions')
    );
  }

  await app.listen(process.env.APP_PORT ?? 3000);

}
bootstrap();