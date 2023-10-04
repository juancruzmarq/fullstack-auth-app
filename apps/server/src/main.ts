import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('The App API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalFilters();
  app.useGlobalInterceptors();
  app.useGlobalPipes();

  await app.listen(configService.get('SERVER_PORT') || 3000, () => {
    console.log(`Listening on port ${configService.get('SERVER_PORT')}`);
  });
}
bootstrap();
