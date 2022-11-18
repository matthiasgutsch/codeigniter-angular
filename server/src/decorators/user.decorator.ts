import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserModel = { id: number; username: string; uuid: string };
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserModel;
  },
);
