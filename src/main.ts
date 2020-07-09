import { NestFactory } from '@nestjs/core';
import { CatModule } from './modules/cat.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CatModule);
  await app.listen(3000);
}
bootstrap();
