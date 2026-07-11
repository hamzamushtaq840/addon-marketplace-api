import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // ◄ 1. Import Swagger tools

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👑 2. Build the Swagger configuration blueprint
  const config = new DocumentBuilder()
    .setTitle('My NestJS API')
    .setDescription('The official API documentation for my application')
    .setVersion('1.0')
    .addBearerAuth() // Optional: Adds a lock icon for JWT authentication
    .build();

  // 👑 3. Create the live document instance
  const document = SwaggerModule.createDocument(app, config);

  // 👑 4. Setup the URL route path (we'll use 'api')
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  Strips away rogue fields hackers try to inject
      transform: true, //  Automatically converts raw JSON to real DTO class instances!
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
