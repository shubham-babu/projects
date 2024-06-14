import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import GqlExceptionFilter from './common/filters/gql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Set the global prefix
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GqlExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS. CORS is a security feature that restricts what resources a web page can request from another domain.
  app.use(cors());
  // Enable Helmet. Helmet helps you secure your Express apps by setting various HTTP headers.
  // app.use(helmet());

  await app.listen(3000);
}
bootstrap();
