import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Lot = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.lot;
  },
);