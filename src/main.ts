import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { NoteModule } from './modules/note/note.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const apiPrefix = process.env.API_PREFIX || 'api';

  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
  });

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerDocs = [
    {
      title: 'GoodFace API',
      description: 'GoodFace API description',
      version: 'v1',
      endpoint: 'swagger',
      include: [AuthModule, NoteModule],
    },
  ];

  for (const item of swaggerDocs) {
    const options = new DocumentBuilder()
      .setTitle(item.title)
      .setDescription(item.description)
      .setVersion(item.version)
      .addBearerAuth({ name: 'api', type: 'http', in: 'header' })
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      include: item.include,
    });
    SwaggerModule.setup(item.endpoint, app, document);
    SwaggerModule.setup(item.endpoint, app, document, {
      useGlobalPrefix: true,
    });
  }

  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
