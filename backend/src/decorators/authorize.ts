import { createParamDecorator } from "routing-controllers";
import { Request } from "express";

export function CurrentUser() {
  return createParamDecorator({
    value: (action) => {
      const request = action.request as Request;
      return request.user;
    },
  });
}