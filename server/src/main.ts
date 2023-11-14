import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  console.log('debug:', process.env.APP_DEBUG);
  console.log('port:', process.env.APP_PORT);
  console.log('link:', `http://127.0.0.1:${process.env.APP_PORT}`)
  await app.listen(process.env.APP_PORT);
}
bootstrap();
