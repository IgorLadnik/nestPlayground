import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatController } from '../controllers/cat.controller';
import { CatService } from '../providers/cat.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService]
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cat', method: RequestMethod.ALL });
  }
}
