import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CatField = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.params[data];
  },
);
