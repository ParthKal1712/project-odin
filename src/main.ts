import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Project Odin API')
    .setDescription('A Type-Safe Backend in NestJS')
    .setVersion('1.0')
    .build();
  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3500);
}
bootstrap();
