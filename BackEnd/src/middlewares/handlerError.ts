import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';

export function handlerError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  new BaseError().sendResponse(res);
}
